import { useRef, useState } from "react";
import styles from "./links.module.css";
import { ArrowRight, Copy, Check } from "lucide-react";
import api from "../../services/api";

const Links = () => {
  const inputField = useRef();
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const shortUrl = async () => {
    const url = inputField.current.value.trim();
    
    if (!url) {
      showNotification("Por favor, insira uma URL válida", "error");
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      showNotification("URL deve começar com http:// ou https://", "error");
      return;
    }

    setLoading(true);
    
    try {
      const response = await api.post('/api/shorten', {
        originalUrl: url
      });
      
      const shortCode = response.data.shortUrl;
      const fullShortenedUrl = `https://encurtador-react.vercel.app/${shortCode}`;
      
      setShortenedUrl(fullShortenedUrl);
      inputField.current.value = "";
      showNotification("URL encurtada com sucesso!", "success");
      
    } catch (error) {
      console.error("Erro ao encurtar URL:", error);
      
      let errorMessage = "Erro ao encurtar URL. Tente novamente.";
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.status === 400) {
        errorMessage = "URL inválida. Certifique-se de incluir http:// ou https://";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      setCopied(true);
      showNotification("URL copiada para a área de transferência!", "success");
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      showNotification("Erro ao copiar URL", "error");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      shortUrl();
    }
  };

  return (
    <section className={styles.Links}>
      <div className={styles.wrapperLinks}>
        <div className={styles.linksContent}>
          <h2>Insira aqui o seu link</h2>
        </div>
        
        <div className={styles.linksInput}>
          <input 
            type="text" 
            placeholder="Cole seu link aqui para encurtar" 
            id="encurtar" 
            ref={inputField}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button 
            onClick={shortUrl} 
            aria-label="Encurtar"
            disabled={loading}
          >
            {loading ? "..." : <ArrowRight />}
          </button>
        </div>

        {shortenedUrl && (
          <div className={styles.resultContainer}>
            <div className={styles.shortenedUrlContainer}>
              <input 
                type="text" 
                value={shortenedUrl} 
                readOnly 
                className={styles.shortenedUrlInput}
              />
              <button 
                onClick={copyToClipboard}
                aria-label="Copiar URL"
                className={styles.copyButton}
              >
                {copied ? <Check /> : <Copy />}
              </button>
            </div>
          </div>
        )}

        {notification.show && (
          <div className={`${styles.notification} ${styles[notification.type]}`}>
            {notification.message}
          </div>
        )}
      </div>
    </section>
  );
};

export default Links;