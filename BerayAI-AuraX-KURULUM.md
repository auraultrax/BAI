# Beray AI Aura X — Kurulum ve notlar

## 1) AI bağlantısı

Uygulama varsayılan olarak `http://localhost:11434` adresindeki yerel uyumlu sohbet API'sine bağlanır. Uzak bir makine kullanıyorsan Ayarlar bölümüne HTTPS servis adresini gir. Adresin sonuna `/v1` veya `/api/chat` ekleme.

Yeni varsayılan profil `Dengeli` olup `qwen3:8b` modelini seçer. Sunucuda modelin kurulu olması gerekir. Kurulum komutları:

```bash
ollama pull qwen3:8b
ollama pull qwen3:4b
ollama pull qwen3:14b
```

- **Hızlı:** `qwen3:4b` — daha düşük bellek kullanımı.
- **Dengeli:** `qwen3:8b` — varsayılan denge.
- **Güçlü:** `qwen3:14b` — daha fazla bellek ve işlem gücü ister.

Model dosyalarının yaklaşık boyutları sırasıyla 2.5 GB, 5.2 GB ve 9.3 GB'dır. Gerçek hız; CPU, GPU/VRAM, RAM, kuantizasyon ve aynı anda çalışan uygulamalara bağlıdır. Daha büyük model otomatik olarak daha hızlı değildir.

Tarayıcıdan bağlanırken yerel API sunucusunun uygulamanın çalıştığı origin'e CORS izni vermesi gerekir. Uzak sunucu kullanıyorsan TLS/HTTPS ve erişim kontrolü kullan; herkese açık, korumasız bir tünel bırakma.

## 2) Google araması

Uygulama Google arama sonuçlarını Serper API üzerinden alır. Serper hesabından API anahtarını edin ve Beray AI > Ayarlar > Google sonuçları API anahtarı alanına ekle. API anahtarı bu tarayıcının `localStorage` alanında tutulur.

Web araması iki şekilde çalışır:
- Mesajda güncel bilgi ihtiyacı algılanırsa otomatik devreye girer.
- Mesaj alanındaki **Web ara** düğmesiyle elle açılabilir.

Arama sonuçlarının başlık, özet ve URL'leri modele bağlam olarak iletilir; cevap altında kaynak bağlantıları gösterilir.

**Önemli:** Google'ın eski Custom Search JSON API'si yeni müşterilere kapalıdır ve 1 Ocak 2027'de sona erer. Bu nedenle burada Serper kullanılıyor; bu, Google sonuçlarını sağlayan üçüncü taraf bir arama servisidir, Google'ın kendi API anahtarı değildir.

## 3) Güvenlik

Bu HTML dosyası istemci tarafında çalışır. Serper anahtarı yalnızca yerel tarayıcı depolamasında saklansa da tarayıcı geliştirici araçlarını kullanabilen kişi tarafından görülebilir. Uygulamayı herkese açık bir web sitesinde yayımlayacaksan arama ve model isteklerini bir sunucu/Edge Function üzerinden geçir; anahtarları frontend'e koyma.

Supabase bağlantısı, önceki dosyadaki proje URL'si ve publishable key ile sohbet kayıtlarını `chats` tablosuna yazmayı dener. Tablo politikaları/şeması izin vermiyorsa sohbet yine tarayıcıda çalışır; senkronizasyon konsola uyarı bırakır.
