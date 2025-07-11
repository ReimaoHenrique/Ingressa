export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TicketPlatform</h3>
            <p className="text-gray-400 dark:text-gray-500">
              Sua plataforma de confiança para compra e verificação de ingressos.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Suporte</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li>Email: contato@ticketplatform.com</li>
              <li>Telefone: (11) 9999-9999</li>
              <li>WhatsApp: (11) 8888-8888</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; 2025 TicketPlatform. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

