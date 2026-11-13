---
author: phyj
pubDatetime: 2026-03-18T10:12:23Z
modDatetime: 2026-03-18T10:12:23Z
title: Majorana 费米子与拓扑超导 · 学习笔记
slug: kiteav
featured: false
draft: false
description: Majorana 费米子与拓扑超导 · 学习笔记
---

Majorana 费米子与拓扑超导 · 学习笔记
===

> 基于 Kitaev 2001 年论文 *"Unpaired Majorana fermions in quantum wires"* 的系列问答整理

------

目录
---

1. [U(1) → Z₂ 对称性破缺](https://claude.ai/chat/ca40d9f8-509b-4dcf-9d97-41fe789068a5#1-u1--z₂-对称性破缺)
2. [为何需要超导系统](https://claude.ai/chat/ca40d9f8-509b-4dcf-9d97-41fe789068a5#2-为何需要超导系统)
3. [Kitaev 链：拓扑相与平庸相](https://claude.ai/chat/ca40d9f8-509b-4dcf-9d97-41fe789068a5#3-kitaev-链拓扑相与平庸相)
4. [体能隙与准粒子局域化](https://claude.ai/chat/ca40d9f8-509b-4dcf-9d97-41fe789068a5#4-体能隙与准粒子局域化)
5. [BCS 与 Ginzburg-Landau 中的 U(1) 破缺](https://claude.ai/chat/ca40d9f8-509b-4dcf-9d97-41fe789068a5#5-bcs-与-ginzburg-landau-中的-u1-破缺)
6. [一维 SOC 纳米线](https://claude.ai/chat/ca40d9f8-509b-4dcf-9d97-41fe789068a5#6-一维-soc-纳米线)
7. [拓扑超导中的量子涡旋](https://claude.ai/chat/ca40d9f8-509b-4dcf-9d97-41fe789068a5#7-拓扑超导中的量子涡旋)
8. [Majorana 零能模与基态简并](https://claude.ai/chat/ca40d9f8-509b-4dcf-9d97-41fe789068a5#8-majorana-零能模与基态简并)
9. [Majorana 编织与非阿贝尔统计](https://claude.ai/chat/ca40d9f8-509b-4dcf-9d97-41fe789068a5#9-majorana-编织与非阿贝尔统计)
10. [拓扑量子比特：最小配置](https://claude.ai/chat/ca40d9f8-509b-4dcf-9d97-41fe789068a5#10-拓扑量子比特最小配置)
11. [动量守恒的困境与破局](https://claude.ai/chat/ca40d9f8-509b-4dcf-9d97-41fe789068a5#11-动量守恒的困境与破局)

------

1. U(1) → Z₂ 对称性破缺
---

### 核心机制

| 操作       | 数学形式                                 | 物理含义                     |
| ---------- | ---------------------------------------- | ---------------------------- |
| U(1) 变换  | $a_j \mapsto e^{i\phi} a_j$              | 电荷（粒子数）守恒           |
| 超导配对项 | $a_j a_{j+1} \to e^{2i\phi} a_j a_{j+1}$ | 破坏任意 $\phi$ 的 U(1) 对称 |
| Z₂ 残留    | $a_j \mapsto -a_j$（$\phi = \pi$）       | 费米子宇称守恒               |

**Kitaev 链哈密顿量：** $$H = \sum_j \left[ -t(a_j^\dagger a_{j+1} + h.c.) - \mu a_j^\dagger a_j + \Delta(a_j a_{j+1} + h.c.) \right]$$

**结论：** 超导序参量将电荷守恒定律**降级**为费米子宇称守恒定律。守恒量变为： $$P = (-1)^{N_{tot}}, \quad N_{tot} = \sum_j a_j^\dagger a_j$$

------

2. 为何需要超导系统
---

### 关键论证：U(1) 禁止孤立 Majorana

复费米子可分解：$a = \frac{1}{2}(\gamma_1 + i\gamma_2)$

在 U(1) 对称系统中，$a \to e^{i\phi} a$ 导致 Majorana 算符**混合**： $$\begin{pmatrix}\gamma_1' \ \gamma_2'\end{pmatrix} = \begin{pmatrix}\cos\phi & -\sin\phi \\ \sin\phi & \cos\phi\end{pmatrix} \begin{pmatrix}\gamma_1 \\ \gamma_2\end{pmatrix}$$

**Z₂ 对称性（超导）下：** 变换矩阵为 $-I$（对角），$\gamma_1$ 和 $\gamma_2$ **独立变换，不相互混合**。

**逻辑链条：**

1. 拓扑量子计算需要非局域自由度（unpaired Majorana）
2. 要局域化，对称性变换不能混合 Majorana 对
3. U(1) 会混合 → 必须破缺 U(1)
4. 超导将 U(1) 降级为 Z₂ → Majorana 可独立存在
5. **∴ 必须在超导系统中寻找 Majorana**

------

3. Kitaev 链：拓扑相与平庸相
---

### 两个极端情形对比

|              | 平庸相 (a)                                   | 拓扑相 (b)                      |
| ------------ | -------------------------------------------- | ------------------------------- |
| **参数**     | $\Delta = t = 0,\ \mu < 0$                   | $\Delta = t > 0,\ \mu = 0$      |
| **哈密顿量** | $H_a = -i\frac{\mu}{2}\sum_j c_{2j-1}c_{2j}$ | $H_b = it\sum_j c_{2j}c_{2j+1}$ |
| **配对方式** | 格点内（Intra-site）                         | 格点间（Inter-site）            |
| **边界态**   | ✗ 无                                         | ✓ 未配对 Majorana               |

### 为何存在边界态

> **物理格点不可分割：** 一个电子格点由 $c_{2j-1}, c_{2j}$ 紧紧绑定。 在拓扑相中，配对跨越了原子边界，链端点处的 $c_1$ 和 $c_{2L}$ 必然"落单"。

### 有限尺寸效应

端点 Majorana 的波函数以相干长度指数衰减： $$\phi_L(x) \sim e^{-x/\xi}, \quad \phi_R(x) \sim e^{-(L-x)/\xi}$$

有效耦合（隧穿振幅）： $$H_{eff} \approx i\delta E, b'b'', \quad \delta E \propto e^{-L/\xi}$$

**∴ 链越长，拓扑保护越强。**

------

4. 体能隙与准粒子局域化
---

### 等价关系

$$\text{体能隙} \Longleftrightarrow \text{零能波函数指数衰减} \Longleftrightarrow \text{隧穿振幅指数抑制}$$

**BdG 谱：** $$E(k) = \sqrt{(2t\cos k + \mu)^2 + 4\Delta^2 \sin^2 k}$$

**衰减长度（相干长度）：** $$l_0 = \frac{v_F}{\Delta_{gap}}$$

- 能隙越大 → $l_0$ 越短 → 端点 Majorana 越难重叠 → **保护越强**
- 能隙关闭 $\Delta \to 0$ → $l_0 \to \infty$ → **拓扑保护失效**

------

5. BCS 与 Ginzburg-Landau 中的 U(1) 破缺
---

### BCS：平均场"强行"破缺 U(1)

$$H_{MF} \sim \sum_k \left(\Delta^* c_{-k\downarrow} c_{k\uparrow} + \Delta c_{k\uparrow}^\dagger c_{-k\downarrow}^\dagger\right)$$

- 包含 $c^\dagger c^\dagger$（产生2个电子）和 $cc$（湮灭2个电子）
- $[H_{MF}, \hat{N}] \neq 0$ → **粒子数不守恒**
- BCS 基态 $|\Psi_{BCS}\rangle \sim \prod_k (u_k + v_k c_k^\dagger c_{-k}^\dagger)|0\rangle$ 是不同粒子数态的线性叠加

### GL 方程：保留 U(1) 对称性

$$F = \alpha|\Psi|^2 + \beta|\Psi|^4 + \frac{1}{2m^*}|(-i\hbar\nabla - 2e\mathbf{A})\Psi|^2$$

> **物理定律（自由能泛函）是对称的，对称性破缺发生在系统选择基态时。**

### 序参量如何"选择"相位

1. **不稳定性：** $T < T_c$ 后，原点变为局域极大值（"帽顶"）
2. **随机涨落：** 热/量子涨落给系统一个微小随机推力
3. **正反馈：** 梯度力迅速将系统推向某个随机相位 $\theta$
4. **相位相干：** 梯度能 $F_{grad} \propto |\nabla\theta|^2$ 将相位锁定至全局一致

**可观测量：** 单个超导体的绝对相位不可观测；约瑟夫森结中的**相位差** $\varphi = \theta_A - \theta_B$ 是物理量，决定超流电流 $I = I_c \sin\varphi$。

------

6. 一维 SOC 纳米线
---

### 哈密顿量

$$H = \frac{p_x^2}{2m^*} + \alpha_R p_x \sigma_y + V_z \sigma_z + \text{超导项}$$

| 项                                    | 作用                              |
| ------------------------------------- | --------------------------------- |
| $V_z \sigma_z$（塞曼场，沿 $z$ 轴）   | 打破时间反演对称性，产生涡旋      |
| $\alpha_R p_x \sigma_y$（Rashba SOC） | 自旋-动量锁定，有效场在 $xy$ 平面 |

### 关键几何关系

$$\mathbf{B}_{eff}(\mathbf{k}) \propto \mathbf{k} \times \hat{z}$$

- 沿 $x$ 方向运动 → 感受到沿 $y$ 方向的有效磁场（$\sigma_y$）
- 沿 $y$ 方向运动 → 感受到沿 $-x$ 方向的有效磁场（$-\sigma_x$）
- $\mathbf{B}*Z \perp \mathbf{B}*{eff}$ → **竞争作用打开拓扑能隙**

### 无磁场时：偶数费米面（时间反演对称）

色散关系配方： $$E_\pm(k) = \frac{\hbar^2}{2m^*}(k \pm k_{SO})^2 - E_{SO}$$

Kramers 定理保证费米点数量**总是偶数** → 无法实现拓扑相。

------

7. 拓扑超导中的量子涡旋
---

### 3个涡旋的情形：3+1模式

在有限二维拓扑超导岛（$p + ip$ 超导）中引入 3 个涡旋：

- **3个** Majorana 局域在涡旋核心（$\gamma_1, \gamma_2, \gamma_3$）
- **1个** Majorana 沿外边界离域分布（$\gamma_{edge}$）

> **原因：** 希尔伯特空间要求 Majorana 总数为偶数；体-边对应要求外边界承载手性边缘模。

### 量子信息编码

| 费米子                                   | 构成       | 编码         |
| ---------------------------------------- | ---------- | ------------ |
| $f_{12} = (\gamma_1 + i\gamma_2)/2$      | 涡旋1+2    | 逻辑量子比特 |
| $f_{3e} = (\gamma_3 + i\gamma_{edge})/2$ | 涡旋3+边界 | 辅助自由度   |

------

8. Majorana 零能模与基态简并
---

### 为什么 $b', b''$ 不出现在哈密顿量中 = 零能

在 sweet spot（$t = \Delta, \mu = 0$）： $$H = 2t\sum_{j=1}^{L-1}\left(d_j^\dagger d_j - \frac{1}{2}\right) + \underbrace{0 \cdot \tilde{a}^\dagger \tilde{a}}_{\text{Zero Mode}}$$

- $|ψ_0\rangle$（空态）和 $|ψ_1\rangle$（占据态）能量**完全相同**
- 费米子宇称守恒 $[H, P] = 0$ → 两态被对称性"隔离"，不会自发跃迁

### 宇称本征值

$$-ib'b''|ψ_0\rangle = +|ψ_0\rangle \quad (\text{偶宇称})$$ $$-ib'b''|ψ_1\rangle = -|ψ_1\rangle \quad (\text{奇宇称})$$

------

9. Majorana 编织与非阿贝尔统计
---

### Ivanov 规则（涡旋交换变换）

$$\gamma_1 \to \gamma_2, \quad \gamma_2 \to -\gamma_1$$

**负号来源：** $\gamma_2$ 在运动路径中穿过涡旋1的拓扑"割线"（Branch Cut），获得相位 $e^{i\pi} = -1$。

**宇称守恒验证：**

$$P_{after} = -i(\gamma_2)(-\gamma_1) = i\gamma_2\gamma_1 = -i\gamma_1\gamma_2 = P_{before} \checkmark$$

### 编织酉算符

$$U_{12} = \exp\left(\frac{\pi}{4}\gamma_1\gamma_2\right) = \frac{1}{\sqrt{2}}(1 + \gamma_1\gamma_2)$$

**推导（Clifford 代数 + Taylor 展开）：**

由于 $(\gamma_n\gamma_m)^2 = -1$（类比虚数单位 $i$），类比欧拉公式： $$\exp(\theta\gamma_n\gamma_m) = \cos\theta + \gamma_n\gamma_m\sin\theta$$

代入 $\theta = \pi/4$ 即得上式。

### 作用在量子态上

$$U_{12}|0\rangle = e^{i\pi/4}|0\rangle, \quad U_{12}|1\rangle = e^{-i\pi/4}|1\rangle$$

对叠加态 $\alpha|0\rangle + \beta|1\rangle$：

$$|\psi_{final}\rangle = e^{i\pi/4}\left(\alpha|0\rangle - i\beta|1\rangle\right)$$

**相对相位差为 $\pi/2$** → 等价于绕 $Z$ 轴旋转 $90°$（$S$ 门）。

### 矩阵表示

**$U_{12}$（对角，同组交换）：** $$U_{12} = \text{diag}\left(e^{-i\pi/4},\ e^{i\pi/4},\ e^{-i\pi/4},\ e^{i\pi/4}\right)$$

**$U_{23}$（跨组交换，产生量子纠缠）：** $$U_{23} = \frac{1}{\sqrt{2}}\begin{pmatrix}1 & i & 0 & 0 \\ i & 1 & 0 & 0 \\ 0 & 0 & 1 & i \\ 0 & 0 & i & 1\end{pmatrix}$$

### 非相邻交换的合成（"华容道"）

$$U_{13} \equiv \exp\left(\frac{\pi}{4}\gamma_1\gamma_3\right) = U_{12}U_{23}^\dagger U_{12}^\dagger$$

**物理意义：** 即使芯片只支持最近邻操作，也可通过编译等效任意长程量子门：

1. $U_{12}$：把 A 从位置1搬到位置2
2. $U_{23}^\dagger$：把 A 从位置2搬到位置3，C 被推到中间
3. $U_{12}^\dagger$：把 C 从位置2归还到位置1

------

10. 拓扑量子比特：最小配置
---

### 为什么需要 4 个 Majorana（2 个准费米子）

**核心限制：费米子宇称超选律**

| 系统                        | 希尔伯特空间 | 问题       |
| --------------------------- | ------------ | ---------- |
| 2个 Majorana（1个准费米子） | ${           | 0\rangle,  |
| 4个 Majorana（2个准费米子） | ${           | 00\rangle, |

### 逻辑量子比特定义

$$|0\rangle_L \equiv |00\rangle \quad (\text{偶宇称})$$ $$|1\rangle_L \equiv |11\rangle \quad (\text{偶宇称})$$

**拓扑保护：** 任何局域噪声（只作用于单端 Majorana）只能将系统踢入奇宇称子空间，被能隙保护阻止，**无法区分** $|0\rangle_L$ 和 $|1\rangle_L$。

------

11. 动量守恒的困境与破局
---

### 困境：动量失配

在一维量子线中加塞曼场（无 SOC）：

$$k_{F\uparrow} = \frac{\sqrt{2m^*(\mu + V_Z)}}{\hbar} \neq k_{F\downarrow} = \frac{\sqrt{2m^*(\mu - V_Z)}}{\hbar}$$

s-波超导体只能提供 $P = 0$ 的库珀对，而纳米线配对需要 $\Delta k = k_{F\uparrow} - k_{F\downarrow} \neq 0$，**违背动量守恒**。

### 破局：Rashba SOC

SOC 使色散关系发生水平偏移，形成**自旋-动量锁定**。在强 SOC + 塞曼场下：

- 费米点仍在 $\pm k_F$，但自旋是上/下的**混合态**
- s-波超导体可以找到动量互反、含相反自旋分量的准粒子 → 完美实现 $P = 0$ 配对

> **一句话：SOC 是修复磁场造成动量失配的"补丁"，是实验上实现拓扑超导的关键。**

### 为何不用连续一维模型（Kitaev 的选择）

**Nielsen-Ninomiya 定理（费米子加倍定理）：** 在任意严格的一维晶格模型中，右行模式与左行模式数量**必须严格相等**。

- 1D 系统边界是 0D 的点，无法承载"手性"（定向传播）
- 要实现手性边缘态，必须依赖高维体态作为支撑（2D 量子霍尔效应）

**∴ Kitaev 选择格点紧束缚模型，利用晶格 Umklapp 过程自然处理动量失配。**

------

关键公式速查
---

| 物理量            | 公式                                                   |
| ----------------- | ------------------------------------------------------ |
| 相干长度          | $\xi = \hbar v_F / \Delta_{gap}$                       |
| 有限尺寸能量劈裂  | $\delta E \propto e^{-L/\xi}$                          |
| 编织算符          | $U_{12} = \frac{1}{\sqrt{2}}(1 + \gamma_1\gamma_2)$    |
| Majorana 积分关系 | $\gamma_1\gamma_2 = i(1 - 2\hat{n}_1)$                 |
| 费米子宇称算符    | $\hat{P} = 1 - 2\hat{N}$                               |
| BdG 谱            | $E(k) = \sqrt{(2t\cos k + \mu)^2 + 4\Delta^2\sin^2 k}$ |

------

*整理自 Gemini 3 Pro 对 Kitaev 2001 论文的系列解读*













