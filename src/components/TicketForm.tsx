import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useForm } from "react-hook-form";
import { Ticket, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TicketFormProps {
  accordionValue?: string;
  children?: React.ReactNode;
  eventoId?: string;
  preco?: number;
}

export function TicketForm({
  accordionValue = "ticket-form",
  children,
  eventoId,
  preco,
}: TicketFormProps) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [termsError, setTermsError] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      cpf: "",
      terms: false,
    },
  });

  function validateCPF(cpf: string) {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, "");

    // Verifica se tem 11 dígitos
    if (cleanCPF.length !== 11) {
      return "CPF deve ter 11 dígitos";
    }

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleanCPF)) {
      return "CPF inválido";
    }

    // Validação dos dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) {
      return "CPF inválido";
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) {
      return "CPF inválido";
    }

    return true;
  }

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || "Email inválido";
  }

  function formatCPF(value: string) {
    // Remove caracteres não numéricos
    const cleanValue = value.replace(/\D/g, "");

    // Aplica a máscara
    return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  async function onSubmit(data: {
    fullName: string;
    email: string;
    cpf: string;
    terms: boolean;
  }) {
    if (!data.terms) {
      setTermsError("Você deve aceitar os termos de uso para continuar.");
      return;
    }

    setTermsError("");
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: data.fullName,
          email: data.email,
          cpf: data.cpf.replace(/\D/g, ""), // Remove formatação
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.mensagem || "Erro ao processar compra");
      }

      if (result.sucesso) {
        setSuccess(true);
        form.reset();

        // Debug: log da resposta
        console.log("Resposta da API:", result);

        // Iniciar contagem regressiva
        setCountdown(3);

        const countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev === null || prev <= 0) {
              clearInterval(countdownInterval);

              // Redirecionar para o Google após a contagem
              window.location.href = "https://www.google.com";
              return null;
            }
            return prev - 1;
          });
        }, 1000);

        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(result.mensagem || "Erro ao processar compra");
      }
    } catch (err) {
      console.error("Erro na compra:", err);
      setError("Erro ao processar compra. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AccordionItem value={accordionValue}>
      <AccordionTrigger className="bg-card text-card-foreground border rounded-lg px-4 py-3 text-base font-medium shadow-sm">
        <span className="flex items-center gap-2">
          <Ticket className="w-5 h-5" />
          Compre seu Ingresso
          {preco && (
            <span className="text-sm text-muted-foreground">
              - R$ {preco.toFixed(2)}
            </span>
          )}
        </span>
      </AccordionTrigger>
      <AccordionContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
            <FormField
              control={form.control}
              name="fullName"
              rules={{ required: "Nome completo é obrigatório" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              rules={{
                required: "Email é obrigatório",
                validate: validateEmail,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              rules={{
                required: "CPF é obrigatório",
                validate: validateCPF,
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000.000.000-00"
                      {...field}
                      onChange={(e) => {
                        const formatted = formatCPF(e.target.value);
                        field.onChange(formatted);
                      }}
                      maxLength={14}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              rules={{ required: "Você deve aceitar os termos de uso" }}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="accent-blue-600 w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <FormLabel htmlFor="terms" className="mb-0 cursor-pointer">
                      Aceito os{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-600 hover:text-blue-800"
                      >
                        termos de uso
                      </a>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {termsError && (
              <Alert variant="destructive">
                <AlertDescription>{termsError}</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold py-3 rounded-lg text-base shadow-lg hover:from-blue-700 hover:to-blue-500 transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processando...
                </div>
              ) : (
                "Comprar Ingresso"
              )}
            </Button>
            {success && (
              <Alert>
                <AlertDescription className="text-green-600">
                  {countdown !== null ? (
                    <>
                      Compra realizada com sucesso! Você será redirecionado para
                      o pagamento em{" "}
                      <span className="font-bold text-blue-600">
                        {countdown}
                      </span>{" "}
                      segundos...
                    </>
                  ) : (
                    "Compra realizada com sucesso! Redirecionando..."
                  )}
                </AlertDescription>
              </Alert>
            )}
          </form>
        </Form>
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
