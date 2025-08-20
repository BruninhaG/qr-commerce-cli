# QR Codes para E‑commerce (CLI)

Gerador de **QR Codes** para links de produtos, pensado para **e‑commerces**. Executa direto no **terminal**, sem interface gráfica. Crie PNG/SVG com cores personalizadas ou renderize no próprio terminal. 

## ✨ Recursos
- Saída **PNG** ou **SVG**, ou **terminal** (ASCII)
- **Cores** personalizáveis (dark/light)
- **Margem** configurável e **tamanho** (px)
- **Correção de erro** L/M/Q/H
- **Nome automático** do arquivo com base no link
- CLI simples com `--help` e exemplos

## 🚀 Instalação
```bash
npm install
npm link  # ou: npm i -g .
```

## ▶️ Uso básico
```bash
qrgen "https://minha-loja.com/produto/sku-123"
```

### Exemplos
```bash
# PNG padrão
qrgen https://loja.com/p/tenis-ultra

# SVG grande com margem 2
qrgen https://loja.com/p/jaqueta --format svg --size 600 --margin 2

# No terminal
qrgen https://loja.com/p/mochila --format terminal
```
