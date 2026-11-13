**记号**

- 衰减因子 $\alpha$:特征多项式 $P(\alpha)=0$ 在 $(0,1)$ 内的唯一根。
- 一般解用混合角 $\vartheta$ 与相对相位 $\varphi$ 表示。
- $s=t_0+\epsilon$,$D=s^2+t_0^2$。
- 转移矩阵 $M$ 对应 $\alpha$ 的特征向量:
  $\mathbf v=(v_1,v_2,v_3)=\big(t_0(t_1-s\alpha),\ s\,t_1-t_0^2\alpha,\ t_0^2\alpha^2-t_1^2\big)$。
- B 子晶格(格点 3、5、6)上的振幅恒为零,下文不再列出。

## 1. 约束关系

边界方程给出

$$
\psi_{1,2}=f(\psi_{1,1},\psi_{1,4})=-\frac{s}{t_0}\,\psi_{1,1}-\frac{t_1}{t_0}\,\psi_{1,4}.
$$

体内各格点都由 $z=\psi_{1,4}$ 一个量决定,记为 $g(z)$:

$$
\psi_{n,4}=z\,\alpha^{\,n-1}\ (n\ge1),\qquad
\psi_{n,1}=z\,\frac{v_1}{v_3}\,\alpha^{\,n-2},\quad
\psi_{n,2}=z\,\frac{v_2}{v_3}\,\alpha^{\,n-2}\ (n\ge2).
$$

## 2. 两个基矢

| site | $(1,1)$ | $(1,2)$ | $(1,4)$ | bulk |
|---|---|---|---|---|
| $\lvert\psi_1\rangle$(衰减解) | $y$ | $f(y,z)$ | $z$ | $g(z)$ |
| $\lvert\psi_2\rangle$(CLS) | $x$ | $f(x,0)$ | $0$ | $0$ |

**① $\langle\psi_2|\psi_2\rangle=1$,确定 $x$:**
$$
x^2\Big(1+\frac{s^2}{t_0^2}\Big)=1\ \Rightarrow\ x=\frac{t_0}{\sqrt D},\qquad f(x,0)=-\frac{s}{\sqrt D}.
$$

**② $\langle\psi_1|\psi_2\rangle=0$,确定 $y$ 与 $z$ 的关系:**
$$
x\,y+f(x,0)\,f(y,z)=0\ \Rightarrow\ y=-\frac{s\,t_1}{D}\,z,\qquad f(y,z)=-\frac{t_0\,t_1}{D}\,z .
$$

**② $\langle\psi_1|\psi_1\rangle=1$,确定 $z$:**
$$
y^2+f(y,z)^2=\frac{t_1^2}{D}z^2,\qquad
\sum_{\rm bulk}|g(z)|^2=\frac{z^2}{1-\alpha^2}\cdot\frac{v_1^2+v_2^2+v_3^2}{v_3^2},
$$

$$
\Rightarrow\quad z=\pm\left[\frac{t_1^2}{D}+\frac{v_1^2+v_2^2+v_3^2}{v_3^2\,(1-\alpha^2)}\right]^{-1/2}.
$$

正负号只是 $|\psi_1\rangle$ 的整体符号,可以任取。

## 3. 最终结果

| site | $(1,1)$ | $(1,2)$ | $(1,4)$ | $(n,1),\ n\ge2$ | $(n,2),\ n\ge2$ | $(n,4),\ n\ge2$ |
|---|---|---|---|---|---|---|
| $\lvert\psi_1\rangle$ | $-\dfrac{s\,t_1}{D}z$ | $-\dfrac{t_0\,t_1}{D}z$ | $z$ | $z\dfrac{v_1}{v_3}\alpha^{n-2}$ | $z\dfrac{v_2}{v_3}\alpha^{n-2}$ | $z\,\alpha^{n-1}$ |
| $\lvert\psi_2\rangle$ | $\dfrac{t_0}{\sqrt D}$ | $-\dfrac{s}{\sqrt D}$ | $0$ | $0$ | $0$ | $0$ |

**一般解:**
$$
|\Phi\rangle=\cos\theta\,|\psi_{\rm I}\rangle+e^{i\varphi}\sin\theta\,|\psi_{\rm II}\rangle,\qquad
\theta\in[0,\pi/2],\ \ \varphi\in[0,2\pi)
$$

$\vartheta=0$ 是纯衰减解,$\vartheta=\pi$ 是纯 CLS;衰减解与 CLS 的权重分别为 $\cos^2\vartheta$ 和 $\sin^2\vartheta$。

逐格点写出:

$$
\Phi_{1,1}=-\cos\frac{\vartheta}{2}\,\frac{s\,t_1}{D}\,z+e^{i\varphi}\sin\frac{\vartheta}{2}\,\frac{t_0}{\sqrt D},\qquad
\Phi_{1,2}=-\cos\frac{\vartheta}{2}\,\frac{t_0\,t_1}{D}\,z-e^{i\varphi}\sin\frac{\vartheta}{2}\,\frac{s}{\sqrt D},
$$

$$
\Phi_{n,4}=\cos\frac{\vartheta}{2}\,z\,\alpha^{\,n-1}\ (n\ge1),\qquad
\Phi_{n,1}=\cos\frac{\vartheta}{2}\,z\,\frac{v_1}{v_3}\,\alpha^{\,n-2},\quad
\Phi_{n,2}=\cos\frac{\vartheta}{2}\,z\,\frac{v_2}{v_3}\,\alpha^{\,n-2}\ (n\ge2).
$$

## 4. 数值($\delta=0.3,\ \epsilon=0.1$,$t_0=1$)

$\alpha=0.8$,$\mathbf v=(2,3,-5)$,$D=2.21$,理论计算给出,

$$\psi_{1,1}=0.28975,\quad \psi_{1,2}=0.26341,\quad \psi_{1,4}=-0.44780,\quad \psi_{2,1}=0.17912,\quad \psi_{2,2}=0.26868 ,$$

与 kwant 的数值结果完全吻合.

<img src="/Users/phyj/Library/Application Support/typora-user-images/image-20261111165756575.png" alt="image-20261111165756575" style="zoom: 33%;" />

