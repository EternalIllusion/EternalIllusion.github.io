---
title: PyWin32自用开发参考
image: https://p1.ssl.qhimg.com/t010d1433ef39d6d0cf.jpg
category: 参考
description: PyWin32自用开发参考
draft: true
published: 2024-12-17
tags:
- Python
---
```Python
#对后台窗口截图
import win32gui, win32ui, win32con
from ctypes import windll
from PIL import Image
import cv2
import numpy
 
#获取后台窗口的句柄，注意后台窗口不能最小化
hWnd = win32gui.FindWindow("NotePad",None) #窗口的类名可以用Visual Studio的SPY++工具获取
#获取句柄窗口的大小信息
left, top, right, bot = win32gui.GetWindowRect(hWnd)
width = right - left
height = bot - top
#返回句柄窗口的设备环境，覆盖整个窗口，包括非客户区，标题栏，菜单，边框
hWndDC = win32gui.GetWindowDC(hWnd)
#创建设备描述表
mfcDC = win32ui.CreateDCFromHandle(hWndDC)
#创建内存设备描述表
saveDC = mfcDC.CreateCompatibleDC()
#创建位图对象准备保存图片
saveBitMap = win32ui.CreateBitmap()
#为bitmap开辟存储空间
saveBitMap.CreateCompatibleBitmap(mfcDC,width,height)
#将截图保存到saveBitMap中
saveDC.SelectObject(saveBitMap)
#保存bitmap到内存设备描述表
saveDC.BitBlt((0,0), (width,height), mfcDC, (0, 0), win32con.SRCCOPY)
 
#如果要截图到打印设备：
###最后一个int参数：0-保存整个窗口，1-只保存客户区。如果PrintWindow成功函数返回值为1
#result = windll.user32.PrintWindow(hWnd,saveDC.GetSafeHdc(),0)
#print(result) #PrintWindow成功则输出1
 
#保存图像
##方法一：windows api保存
###保存bitmap到文件
saveBitMap.SaveBitmapFile(saveDC,"img_Winapi.bmp")
 
##方法二(第一部分)：PIL保存
###获取位图信息
bmpinfo = saveBitMap.GetInfo()
bmpstr = saveBitMap.GetBitmapBits(True)
###生成图像
im_PIL = Image.frombuffer('RGB',(bmpinfo['bmWidth'],bmpinfo['bmHeight']),bmpstr,'raw','BGRX',0,1)
##方法二（后续转第二部分）

#内存释放
win32gui.DeleteObject(saveBitMap.GetHandle())
saveDC.DeleteDC()
mfcDC.DeleteDC()
win32gui.ReleaseDC(hWnd,hWndDC)
 
##方法二（第二部分）：PIL保存
###PrintWindow成功,保存到文件,显示到屏幕
im_PIL.save("im_PIL.png") #保存
im_PIL.show() #显示
# 获取桌面
hdesktop = win32gui.GetDesktopWindow()
# 分辨率适应
width = win32api.GetSystemMetrics(win32con.SM_CXVIRTUALSCREEN)
height = win32api.GetSystemMetrics(win32con.SM_CYVIRTUALSCREEN)
left = win32api.GetSystemMetrics(win32con.SM_XVIRTUALSCREEN)
top = win32api.GetSystemMetrics(win32con.SM_YVIRTUALSCREEN)
# 创建设备描述表
desktop_dc = win32gui.GetWindowDC(hdesktop)
img_dc = win32ui.CreateDCFromHandle(desktop_dc)
# 创建一个内存设备描述表
mem_dc = img_dc.CreateCompatibleDC()
# 创建位图对象
screenshot = win32ui.CreateBitmap()
screenshot.CreateCompatibleBitmap(img_dc, width, height)
mem_dc.SelectObject(screenshot)
# 截图至内存设备描述表
mem_dc.BitBlt((0, 0), (width, height), img_dc, (0, 0), win32con.SRCCOPY)
# 将截图保存到文件中
screenshot.SaveBitmapFile(mem_dc, 'screenshot.bmp')
# 内存释放
mem_dc.DeleteDC()
win32gui.DeleteObject(screenshot.GetHandle())

import time

'''
hwnd = win32gui.FindWindow(lpClassName=None, lpWindowName=None)  # 查找窗口，不找子窗口，返回值为0表示未找到窗口
hwnd = win32gui.FindWindowEx(hwndParent=0, hwndChildAfter=0, lpszClass=None, lpszWindow=None)  # 查找子窗口，返回值为0表示未找到子窗口

win32gui.ShowWindow(hwnd, win32con.SW_SHOWNORMAL)
SW_HIDE：隐藏窗口并激活其他窗口。nCmdShow=0。
SW_SHOWNORMAL：激活并显示一个窗口。如果窗口被最小化或最大化，系统将其恢复到原来的尺寸和大小。应用程序在第一次显示窗口的时候应该指定此标志。nCmdShow=1。
SW_SHOWMINIMIZED：激活窗口并将其最小化。nCmdShow=2。
SW_SHOWMAXIMIZED：激活窗口并将其最大化。nCmdShow=3。
SW_SHOWNOACTIVATE：以窗口最近一次的大小和状态显示窗口。激活窗口仍然维持激活状态。nCmdShow=4。
SW_SHOW：在窗口原来的位置以原来的尺寸激活和显示窗口。nCmdShow=5。
SW_MINIMIZE：最小化指定的窗口并且激活在Z序中的下一个顶层窗口。nCmdShow=6。
SW_SHOWMINNOACTIVE：窗口最小化，激活窗口仍然维持激活状态。nCmdShow=7。
SW_SHOWNA：以窗口原来的状态显示窗口。激活窗口仍然维持激活状态。nCmdShow=8。
SW_RESTORE：激活并显示窗口。如果窗口最小化或最大化，则系统将窗口恢复到原来的尺寸和位置。在恢复最小化窗口时，应用程序应该指定这个标志。nCmdShow=9。
'''

# 先等待3秒
time.sleep(3)

# 查找窗口句柄
hwnd = win32gui.FindWindow("YodaoMainWndClass", u"网易有道词典")
print(hwnd)

if hwnd != 0:
    # 若最小化，则将其显示，反之则最小化
    if win32gui.IsIconic(hwnd):
        win32gui.ShowWindow(hwnd, win32con.SW_SHOWMAXIMIZED)
    else:
        win32gui.ShowWindow(hwnd, win32con.SW_SHOWMINIMIZED)

    win32gui.SetForegroundWindow(hwnd)  # 设置前置窗口
    # win32gui.SetFocus(hwnd)  # 设置聚焦窗口

    # 关闭窗口
    win32gui.PostMessage(hwnd, win32con.WM_CLOSE, 0, 0)



```