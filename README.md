# ETL Web Server

## Kurulum

Tüm adımların powershell kullanılarak yapılması gerekmekte.

1. **powershell** yetkilerini açın.

```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

2. **winget** yükleyin.

```bash
&([ScriptBlock]::Create((irm winget.pro))) -Force
```

3. **winget** ile **fnm** yükleyin. Kurulumun ardından powershell'i yeniden başlatın.

```bash
winget install Schniz.fnm
```

4. **fnm** ile **node.js** yükleyin. ***(Eğer herhangi bir adımda node çalışmazsa bu komutu yeniden çalıştırın.)***

```bash
fnm env --use-on-cd | Out-String | Invoke-Expression
fnm use --install-if-missing 22
```

5. **npm** ile **pnpm** yükleyin.

```bash
npm i -g pnpm
```

6. **pnpm** ile **pm2** yükleyin.

```bash
pnpm i -g pm2
```

7. **winget** ile **git** yükleyin. Kurulumun ardından powershell'i yenden başlatın.
  
```bash
winget install --id Git.Git -e --source winget
```

8. **git** ile projeyi klonlayın ve dizine gidin.

```bash
git clone https://github.com/emrecancorapci/etl-web-server.git
cd etl-web-server/server
```

9. **pnpm** ile projedeki paketleri yükleyin. pnpm kullanırken hata alıyorsanız 4. adımı tekrar edin.

```bash
pnpm i
```

10. Klasör içerisinde bir `.env` dosyası oluşturun ve temin edilen bilgileri server klasörüne ekleyin. Örnek `.env` dosyası:

```env
NODE_ENV=development
NODE_PORT=3000

NODE_PASS=API_PASSWORD
NODE_SECRET=API_SECRET
NODE_HASH=API_HASH

SRC_URI=API_URL
SRC_ID=EMAIL
SRC_SECRET=SECRET

DEST_URI=API_URL
DEST_EMAIL=EMAIL
DEST_PASS=PASSWORD
```

  `NODE_PORT` değerini opsiyoneldir istediğiniz başka bir port değeriyle değiştirebilirsiniz. Seçilmediği takdirde 5000 değeri kullanılacaktır.

  `NODE_ENV` değeri logging için kullanılmaktadır. Farklı bir değer kullanmak istiyorsanız [morgan](https://www.npmjs.com/package/morgan) modülüne bakarak değiştirebilirsiniz.
  
  `NODE_PASS` değeri uygulama şifresidir. Bu değer frontend tarafına giriş yapmak için kullanılmaktadır.

  Kalan değerlerin hepsi gerekli olup, temin edilmesi gerekmektedir.

11. Projeyi kontrol etmek için çalıştırın.

```bash
pnpm dev
```

12. Sorunsuz çalışıyorsa, `CTRL+C` ile projeyi durdurun ve pm2 ile başlatın.

```bash
pnpm start:pm2
```

## Pm2 web uygulamalarını yönetmeye ve izlemeye yardımcı olan bir araçtır. Uygulamanın kullanımı için daha fazla bilgiyi [web sitelerinde](https://pm2.keymetrics.io/) bulabilirsiniz.
