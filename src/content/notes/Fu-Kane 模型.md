---
title: "Fu Kane 模型"
pubDatetime: 2026-04-27T15:02:55Z
description: "FuKane 模型：如何把一个平庸的 s 波超导体，硬生生“扭”成一个拓扑 p 波超导体。"
draft: false
tags:
  - "Fu模型"
---
### Table of contents

**Fu-Kane 模型：**如何把一个平庸的 s 波超导体，硬生生“扭”成一个拓扑 p 波超导体。
---

### 狄拉克锥的能谱与螺旋度 (Helicity)

$$E_{\mathbf{k}} = \pm \sqrt{(\pm vk - \mu)^2 + \Delta_0^2}$$

根号里面的 $\pm vk$ 是拓扑绝缘体表面态的标志——**狄拉克锥 (Dirac Cone)**。由于强烈的自旋轨道耦合 ($\sigma \cdot \nabla$)，表面态电子的自旋和动量是被严格锁死的 (Spin-momentum locking)。

- 对于上锥 ($+vk$)，自旋总是垂直于动量方向，并在费米面上形成一个涡旋状的自旋结构。
- 对于下锥 ($-vk$)，自旋方向则完全相反。

对于典型的三维拓扑绝缘体（如 $\text{Bi}_2\text{Se}_3$），其二维表面态的有效哈密顿量具有 Rashba 型的自旋轨道耦合形式：

$$H = v(k_x \sigma_y - k_y \sigma_x) = v(\mathbf{k} \times {\sigma}) \cdot \hat{z}$$

为了清晰，我们转换到极坐标 $\mathbf{k} = (k\cos\theta, k\sin\theta)$：

$$H = vk \begin{pmatrix} 0 & -ie^{-i\theta} \\ ie^{i\theta} & 0 \end{pmatrix}$$

求解这个极其简洁的 $2 \times 2$ 矩阵，我们可以精确得到上下两个狄拉克锥的能量本征值和本征态（旋量）：

- **上锥（导带）：** $E_+ = +vk$，对应本征态 $|\psi_+\rangle = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 \\ i e^{i\theta} \end{pmatrix}$
- **下锥（价带）：** $E_- = -vk$，对应本征态 $|\psi_-\rangle = \frac{1}{\sqrt{2}} \begin{pmatrix} 1 \\ -i e^{i\theta} \end{pmatrix}$

### 严密验证：垂直锁定与相反的螺旋度 (Helicity)

现在，我们计算这两个本征态在 $x-y$ 平面内的自旋期望值 $\langle \vec{\sigma} \rangle = (\langle \sigma_x \rangle, \langle \sigma_y \rangle)$。

**对于上锥 $|\psi_+\rangle$：**

$$\langle \sigma_x \rangle_+ = \frac{1}{2} \begin{pmatrix} 1 & -ie^{-i\theta} \end{pmatrix} \begin{pmatrix} 0 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} 1 \\ ie^{i\theta} \end{pmatrix} = -\sin\theta$$

$$\langle \sigma_y \rangle_+ = \frac{1}{2} \begin{pmatrix} 1 & -ie^{-i\theta} \end{pmatrix} \begin{pmatrix} 0 & -i \\ i & 0 \end{pmatrix} \begin{pmatrix} 1 \\ ie^{i\theta} \end{pmatrix} = \cos\theta$$

因此，上锥的自旋矢量为 $\mathbf{S}_+ = (-\sin\theta, \cos\theta)$。

**对于下锥 $|\psi_-\rangle$：**

同理计算可得：

$$\langle \sigma_x \rangle_- = \sin\theta$$

$$\langle \sigma_y \rangle_- = -\cos\theta$$

下锥的自旋矢量为 $\mathbf{S}_- = (\sin\theta, -\cos\theta) = -\mathbf{S}_+$。

### 见证奇迹：投影出 $p_x + ip_y$ 波

### 1. 能带解耦与算符的逆变换

在强烈的自旋轨道耦合下，拓扑绝缘体表面态的自旋不再是好量子数。本征态变成了自旋与动量纠缠的“螺旋态 (Helical states)”。

上狄拉克锥的本征算符（即你引文中的 $d_{\mathbf{k}}$）为：

$$d_{\mathbf{k}} = \frac{1}{\sqrt{2}}(c_{\mathbf{k}\uparrow} + e^{i\theta_{\mathbf{k}}} c_{\mathbf{k}\downarrow})$$

（注：这里相角定义可能因规范而差一个符号，但物理本质相同）。

同理，下狄拉克锥的本征算符必然与之正交：

$$d_{-\text{cone}, \mathbf{k}} = \frac{1}{\sqrt{2}}(c_{\mathbf{k}\uparrow} - e^{i\theta_{\mathbf{k}}} c_{\mathbf{k}\downarrow})$$

**低能近似（大化学势极限）：** 由于化学势 $\mu \gg \Delta_0$ 且置于上锥深处，下锥的态深埋在费米面之下，无法参与发生在费米面附近的低能超导配对。因此，我们在有效理论中直接**丢弃下锥自由度**（令 $d_{-\text{cone}, \mathbf{k}} \approx 0$）。

在此近似下，我们反解出原始的电子算符：

$$c_{\mathbf{k}\uparrow} \approx \frac{1}{\sqrt{2}} d_{\mathbf{k}}$$

$$c_{\mathbf{k}\downarrow} \approx \frac{1}{\sqrt{2}} e^{-i\theta_{\mathbf{k}}} d_{\mathbf{k}}$$

**物理意义：** 原始的“自旋向上”和“自旋向下”电子，现在都只是这个单根螺旋准粒子 $d_{\mathbf{k}}$ 在不同自旋方向上的投影分量。

### 2. S 波配对的代数代入

标准的 s 波（自旋单态）配对项为：

$$V_{\text{s-wave}} = \Delta c_{\mathbf{k}\uparrow}^\dagger c_{-\mathbf{k}\downarrow}^\dagger$$

我们将上一步求出的逆变换代入，把 $c$ 算符替换为低能有效的 $d$ 算符。

注意：对于第二个算符，动量是 $-\mathbf{k}$，所以其依赖的相角也必须是 $\theta_{-\mathbf{k}}$！

$$c_{\mathbf{k}\uparrow}^\dagger \approx \frac{1}{\sqrt{2}} d_{\mathbf{k}}^\dagger$$

$$c_{-\mathbf{k}\downarrow}^\dagger \approx \frac{1}{\sqrt{2}} e^{i\theta_{-\mathbf{k}}} d_{-\mathbf{k}}^\dagger$$

将它们相乘，直接得到投影后的有效配对项：

$$V_{\text{eff}} = \Delta \left( \frac{1}{\sqrt{2}} d_{\mathbf{k}}^\dagger \right) \left( \frac{1}{\sqrt{2}} e^{i\theta_{-\mathbf{k}}} d_{-\mathbf{k}}^\dagger \right) = \frac{\Delta}{2} e^{i\theta_{-\mathbf{k}}} d_{\mathbf{k}}^\dagger d_{-\mathbf{k}}^\dagger$$

### 3. 几何相位的魔术：动量反转与自旋翻转

这是最关键的一步。在 2D 动量平面上，$\mathbf{k}$ 的极角是 $\theta_{\mathbf{k}}$。

当我们取反向动量 $-\mathbf{k}$ 时，它在极坐标中的角度正好转了半圈（$180^\circ$）：

$$\theta_{-\mathbf{k}} = \theta_{\mathbf{k}} + \pi$$

代入指数项中，就会产生一个极度关键的负号：

$$e^{i\theta_{-\mathbf{k}}} = e^{i(\theta_{\mathbf{k}} + \pi)} = e^{i\theta_{\mathbf{k}}} e^{i\pi} = -e^{i\theta_{\mathbf{k}}}$$

我们将这个结果代回配对项 $V_{\text{eff}}$ 中：

$$V_{\text{eff}} = - \frac{\Delta}{2} e^{i\theta_{\mathbf{k}}} d_{\mathbf{k}}^\dagger d_{-\mathbf{k}}^\dagger$$

如果我们采用更严格的完全反对称 s 波配对形式 $\Delta (c_{\mathbf{k}\uparrow}^\dagger c_{-\mathbf{k}\downarrow}^\dagger - c_{\mathbf{k}\downarrow}^\dagger c_{-\mathbf{k}\uparrow}^\dagger)$，做同样的代入化简，你会得到：

$$V_{\text{eff}} = - \Delta e^{i\theta_{\mathbf{k}}} d_{\mathbf{k}}^\dagger d_{-\mathbf{k}}^\dagger$$

### 结论：完美的无自旋 p 波

你看最后的这个哈密顿量，它有两个极其深刻的数学特征：

1. **只剩一种粒子：** 算符只有 $d^\dagger$，没有自旋指标。这在数学上完全等价于一个**无自旋费米子 (Spinless fermion)** 构成的体系。
2. **奇宇称配对：** 配对系数 $\Delta_{\text{eff}}(\mathbf{k}) \propto e^{i\theta_{\mathbf{k}}}$。因为 $e^{i\theta_{\mathbf{k}}} = (k_x + i k_y)/|k|$，这是一个**奇函数**（$\Delta_{\text{eff}}(-\mathbf{k}) = -\Delta_{\text{eff}}(\mathbf{k})$）。这完美满足了无自旋体系必须由反对称空间波函数（p 波）配对的要求。

**为什么说这就是 $p+ip$ 波？**

在极坐标中，动量相角 $e^{i\theta_{\mathbf{k}}} = \cos\theta_{\mathbf{k}} + i\sin\theta_{\mathbf{k}}$。

把它乘上动量的大小 $k$，这就是 $k_x + i k_y$！

而 $k_x + i k_y$ 正是我们在前几轮讨论中反复提到的，具有奇宇称和非平庸拓扑的 **2D 手性 p 波超导体 ($p_x + ip_y$)** 的标准空间波函数对称性。

### 附 zeeman场

### 1. 哈密顿量与“狄拉克质量” (Dirac Mass) 的产生

原本的二维无质量狄拉克（或 Rashba）哈密顿量可以写为 $H_0 = v(k_x \sigma_x + k_y \sigma_y)$。

现在加入 $z$ 方向的塞曼场 $H_Z = V_z \sigma_z$（假设 $V_z > 0$）：

$$H = v k_x \sigma_x + v k_y \sigma_y + V_z \sigma_z = \begin{pmatrix} V_z & v k_x - i v k_y \\ v k_x + i v k_y & -V_z \end{pmatrix} = \begin{pmatrix} V_z & v k e^{-i\theta_{\mathbf{k}}} \\ v k e^{i\theta_{\mathbf{k}}} & -V_z \end{pmatrix}$$

求解这个矩阵的本征值：

$$E_{\pm}(\mathbf{k}) = \pm \sqrt{(vk)^2 + V_z^2}$$

**物理结论：** 原本在 $k=0$ 处无能隙的狄拉克点（Dirac point）被彻底打开了一个大小为 $2V_z$ 的能隙！在场论中，这个 $V_z \sigma_z$ 项被称为**狄拉克质量项 (Dirac mass term)**。

### 2. 本征态的演化：被“拽出”赤道的自旋

这是对你上一个问题的直接回应。塞曼场的加入，直接打破了 $50/50$ 的均等叠加概率。

我们引入一个动量依赖的极角 $\phi_{\mathbf{k}}$，定义 $\tan \phi_{\mathbf{k}} = \frac{vk}{V_z}$。

解上述矩阵，上能带（$E_+$）的精确本征态变成了：

$$|d_{\mathbf{k}}'\rangle = \begin{pmatrix} \cos(\frac{\phi_{\mathbf{k}}}{2}) \\ \sin(\frac{\phi_{\mathbf{k}}}{2}) e^{i\theta_{\mathbf{k}}} \end{pmatrix} = \cos(\frac{\phi_{\mathbf{k}}}{2}) c_{\mathbf{k}\uparrow} + \sin(\frac{\phi_{\mathbf{k}}}{2}) e^{i\theta_{\mathbf{k}}} c_{\mathbf{k}\downarrow}$$

让我们在不同的动量区域检验这个算符：

- **极限 1：在 $k=0$ 点（能谷底部）。**

  此时 $vk = 0 \implies \phi_{\mathbf{k}} = 0$。

  代入上式，本征态坍缩为 $|d_0'\rangle = \begin{pmatrix} 1 \\ 0 \end{pmatrix} = c_{0\uparrow}$。

  **电子完全被塞曼场极化为自旋向上，自旋向下分量彻底消失！**

- **极限 2：在 $k \to \infty$ 处（远离能谷）。**

  此时 $vk \gg V_z \implies \phi_{\mathbf{k}} \to \pi/2$。

  代入上式，$\cos(\pi/4) = \sin(\pi/4) = 1/\sqrt{2}$。本征态退化回我们上一轮讨论的 $d_{\mathbf{k}} = \frac{1}{\sqrt{2}}(c_{\uparrow} + e^{i\theta} c_{\downarrow})$。自旋重新躺平在 $x-y$ 平面上。

**物理结论：** 塞曼场的作用是将布洛赫球（Bloch sphere）赤道上的自旋，向北极（$+z$ 方向）“拽”了起来（Spin canting）。自旋不再严格锁定在 $x-y$ 平面内，而是产生了一个依赖于动量的 $z$ 分量期望值 $\langle \sigma_z \rangle = \cos \phi_{\mathbf{k}}$。

### 3. 贝里曲率的爆发与陈数 (Chern Number)

从拓扑几何的角度看，这个变化是革命性的。

当 $V_z = 0$ 时，自旋全躺在赤道上绕一圈，包围的立体角是 0（或者说贝里曲率处处为 0，除了 $k=0$ 处的奇异点）。

当 $V_z \neq 0$ 时，随着 $\mathbf{k}$ 从 $0$ 扫到 $\infty$，自旋矢量从北极出发，像一把打开的伞一样，逐渐撑开并最终平铺到赤道上。

计算这个演化过程的贝里曲率 $\Omega_z(\mathbf{k})$，并在整个二维动量平面上积分，你会得到一个著名的半整数量子化拓扑不变量：

$$C = \frac{1}{2\pi} \int d^2k \, \Omega_z(\mathbf{k}) = \frac{1}{2} \text{sgn}(V_z)$$

这就是**量子反常霍尔效应 (QAH)** 以及一半的拓扑磁电效应的核心数学基础。

### 总结与延伸

在真实的拓扑量子计算模型（如著名的半导体纳米线 Lutchyn-Oreg-Das Sarma 模型，或 2D 的 QAH-超导异质结）中：

**只有当外部施加的 $z$ 方向塞曼能 $V_z$ 足够强，不仅打开了能隙，而且其强度超越了超导配对能和化学势的共同束缚（即满足拓扑相界条件 $V_z > \sqrt{\mu^2 + \Delta^2}$）时，系统才会被强行推进拓扑非平庸相，从而在边界产生 Majorana 零能模。**
