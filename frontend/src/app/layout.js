import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/menu";
import Script from "next/script";

export const metadata = {
  title: "Pagina con next",
  description: "Proyecto con next"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es"> {/* Añadido el atributo lang para accesibilidad */}
      <body>
        <NavBar />
        {children}
        
        {/* Cargar Popper.js */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
          integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />

        {/* Cargar Bootstrap JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
          integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
