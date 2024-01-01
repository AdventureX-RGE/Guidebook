# 树莓派 Pico 教程

这是一个关于如何使用微控制器，特别是树莓派 Pico 的初学者教程。无论你的经验水平如何，你都可以理解我们的教学内容。我们在这里打下一些基础，并将在黑客马拉松中举办更多与硬件相关的活动。我们希望你从这个 Hackpack 中学到的技能能够帮助你在硬件方面打好基础，并产生自己的创意想法！

#### 部件:
基本设置：
1. 树莓派 Pico
2. 微型 USB 电缆
3. 你的电脑！

制作 Pico 项目还需要以下部件：
1. 舵机电机
2. 杜邦线（母头对母头和母头对公头）
3. 红外传感器
4. 面包板

# ⚙️ 设置 

1) 从 [https://thonny.org/](https://thonny.org/) 下载 Thonny: 点击屏幕右上角的下载按钮，选择适用于你操作系统的下载按钮。

2) 将 Pico 连接到电脑: 你需要一根将 Pico 与电脑连接的微型 micro-USB 线。连接时，你需要按下 Pico 上的白色 bootsel 按钮，然后释放它。

![picobootsel](https://user-images.githubusercontent.com/93958307/209513036-7c1e759a-7dba-4e99-8e2a-449fc67138fd.gif)

一个名为 RPI-RP2 的文件夹应该会弹出，这意味着 Pico 已成功刷入到你的电脑中。

<img width="950" alt="Screenshot 2022-12-23 at 3 55 32 PM" src="https://user-images.githubusercontent.com/93958307/209323810-9fbea274-6d98-4ac1-99fc-a80f2b072a6d.png">

3) 下载 uf2 文件: 在 RPI-RP2 文件夹中，点击 INDEX.HTM 文件，这将重定向到一个名为 "Raspberry Pi Documentation" 的网页。在这个页面上滚动到 "Microcontrollers" 选项卡下，你会看到 "Micropython"。点击进入。

<img width="1238" alt="Screenshot 2022-12-23 at 3 58 57 PM" src="https://user-images.githubusercontent.com/93958307/209320266-1950d801-a727-43f0-8ea8-959ff351c047.png">

现在，在 Micropython 页面上滚动到 "Drag-and-Drop MicroPython" 部分，在其中你会看到下载不同板的 Micropython 的说明。点击 "Raspberry Pi Pico" 选项，下载一个 uf2 文件（文件名类似 rp2-pico-......uf2）。

<img width="1224" alt="Screenshot 2022-12-23 at 4 01 33 PM" src="https://user-images.githubusercontent.com/93958307/209320961-1aadbe9c-0a17-40eb-b862-4ff817c19e52.png">

5) 将文件添加到 Pico: 将文件拖放到 RPI-RP2 文件夹中。这将导致 Pico 断开连接。然后，从 Mac 上拔下 Pico。设置这个 Micropython 的过程只需要一次，用于设置 Micropython，连接 Pico 到电脑时不需要每次都执行。

![gif_pico](https://user-images.githubusercontent.com/93958307/209324715-f7351ff9-e491-4e9c-a86c-b4222e115b00.gif)

# Pico 上的 Micropython 🖥️

1) 连接 Pico: 将 Pico 通过连接线连接到电脑。不要按下 bootsel 按钮。此时不会出现任何文件夹。

2) 连接到 Thonny: 接下来，打开我们在 "设置" 步骤中下载的 Thonny 编辑器。点击下方右侧的选项卡，如下图所示，选择 "MicroPython (Raspberry Pi Pico)"。

<img width="833" alt="Screenshot 2022-12-23 at 7 53 37 PM" src="https://user-images.githubusercontent.com/93958307/209351487-b61eea61-8820-4dae-b442-fc549c4d8fbf.png">

7) Hello world: 让我们通过在 Thonny 的 shell 中运行一个简单的打印语句来检查是否有错误。

<img width="868" alt="thonnyimg" src="https://user-images.githubusercontent.com/93958307/209351907-ad8aebe6-2af4-4548-966e-e4f059ec8c0e.png">

8) Blink.py: 现在，我们在 Pico 上运行一个实际的程序。在 Thonny 中打开一个新文件，复制粘贴这个存储库中提供的 blink.py 的内容。这样做后，点击 "Save"，然后会提示你选择保存的位置-选择 "This Computer"。将文件保存为 "blink.py"。

![thonnyblink](https://user-images.githubusercontent.com/93958307/209460037-6b61313e-6b9e-46f7-a0f9-b63856220c82.gif)

10) 然后，在 Thonny 编辑器的顶部标签中点击 "run" 按钮。要停止运行程序，点击同一标签中的 "stop" 按钮。

![thonnyconnect](https://user-images.githubusercontent.com/93958307/209353975-ccd6c73e-5579-4516-95b4-28d00ec2a4f3.gif)

这是 blink.py 的结果-你的 Pico 的内置 LED 会周期性地闪烁！

![picoblink](https://user-images.githubusercontent.com/93958307/209513748-d9da48de-b6f2-4129-8602-bc48b2bc1d44.gif)

9) 自动运行代码: 如果你希望在不点击 "run" 按钮并使用 Thonny 的情况下运行此代码，只需将文件重命名为 main.py，并将其保存到 "Raspberry Pi Pico" 而不是 "This Computer"。Pico 一直在寻找 main.py 文件，并自动运行它。因此，每当 Pico 连接到电源时，它都会自动运行主.py 中的代码。

[演示视频](https://user-images.githubusercontent.com/93958307/209356017-308ecaa8-3088-4eb6-9975-39af675000bc.mov)

所以现在，每当我将 Pico 连接到电脑时，它都会自动运行 main.py，Pico 上的 LED 就会开始闪烁。
//视频展示我连接和断开它

#### 恭喜你在你的 Pico 上运行了一个 Micropython 程序!! 🎉

现在，你可以尝试使用不同的 Micropython 程序，并让你的 Pico 做一些很酷的事情。在下一节中，我们将介绍如何将你的 Pico 进一步连接到其他对象，从而可以构建更多的项目！ 

### ⚡ Pico 

Pico 是一款微控制器，类似于 Arduino 或 Adafruit 的著名 M4 Feather Express。它具有数字输入和输出引脚（GPIO）以及模拟引脚（ADC）。这些引脚是当我们将 Pico 连接到其他对象，如传感器、电机、LED 等时使用的。你可以在它的数据表中了解更多信息: [Pico 数据表](https://datasheets.raspberrypi.com/pico/pico-datasheet.pdf)

<img width="795" alt="Screenshot 2022-12-25 at 12 36 18 PM" src="https://user-images.githubusercontent.com/93958307/209459854-3e409013-b438-4ffc-b3a4-9d9e7befde19.png">

# 例子: 红外传感器 + 舵机电机

我们将演示如何使用红外传感器与舵机电机结合使用。我们最终的结果将是一个在物体靠近传感器时启动的舵机电机！

## 舵机

#### 连接: 
如果你以前没有使用过面包板并想了解更多信息，你可以查看...，（尽管这不是必需的）  
要连接舵机，请参照下面的图像：

![picoservo](https://user-images.githubusercontent.com/93958307/209617753-6e762a2f-15ff-4fe4-b924-08c4fc5ca186.png)

我们连接到的引脚是:
1. 舵机的红线（VCC）连接到 Pico 的 3V3(OUT) 
2. 舵机的黑线（GND）连接到 Pico 的 GND
3. 舵机的橙线（OUT）连接到 Pico 的 GPIO-0

整个过程应该看起来像这样：

[演示视频](https://user-images.githubusercontent.com/93958307/209615678-ab9aa838-0db8-4334-8671-44983f771de6.mov)

#### 代码
请查看 servomotor.py 文件中的代码。通过将代码保存为主板上的 main.py 文件，或通过 Thonny 运行它，你可以运行代码，就像我们之前用 'blink' 示例一样。

#### 演示


## 添加传感器

#### 连接:

要连接红外传感器，请参照下面的图像：

![irpico](https://user-images.githubusercontent.com/93958307/210133069-0b2d2199-9dbe-45cd-a366-eba8e0e84daa.png)

我们连接到的引脚是:
1. 传感器的红线（VCC）连接到 Pico 的 3V3(OUT) 
2. 传感器的黑线（GND）连接到 Pico 的 GND
3. 传感器的橙线（OUT）连接到 Pico 的 GPIO-21

正如你所见，有两根线需要连接到 Pico 的 3V3(OUT) 引脚-舵机的和服务器的。为此，我们将 3v3 引脚连接到面包板较小的两行侧面的一行，并在同一条线上连接两根线！整个过程应该看起来像这样：

[演示视频](https://user-images.githubusercontent.com/93958307/211267151-88f961cc-dde9-40b5-8d4e-b5c39ba7e7b7.MOV)

最终的连接应该看起来像这样：

![IMG_1973](https://user-images.githubusercontent.com/93958307/211283552-282e4a42-9abf-4400-8ec0-05bd0ca40e46.JPG)

#### 代码

请查看 irservo.py 文件中的代码。通过将代码保存为主板上的 main.py 文件，或通过 Thonny 运行它，你可以运行代码，就像我们之前用 'blink' 示例一样。

#### 演示
请注意，当有干扰时，红外传感器上会亮起两个红灯，而在没有干扰时只会亮起一个！

![irdemo](https://user-images.githubusercontent.com/93958307/211282114-2b6d7d58-a09e-4e67-bc30-4559054d3ae5.gif)
