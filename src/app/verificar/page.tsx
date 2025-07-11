"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, Loader2, Ticket } from "lucide-react";
import { ingressosMock } from "@/lib/mock-data";
import { MESSAGES } from "@/lib/constants";
import {
  VerificarIngressoRequest,
  VerificarIngressoResponse,
  Ingresso,
} from "@/types";

export default function VerificarPage() {
  const [formData, setFormData] = useState<VerificarIngressoRequest>({
    cpf: "",
    nome: "",
  });
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<VerificarIngressoResponse | null>(
    null
  );

  const handleInputChange = (
    field: keyof VerificarIngressoRequest,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCPF = (value: string) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, "");

    // Aplica a máscara do CPF
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    return numbers
      .slice(0, 11)
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    handleInputChange("cpf", formatted);
  };

  const verificarIngresso = async () => {
    if (!formData.cpf && !formData.nome) {
      setResultado({
        sucesso: false,
        mensagem: "Por favor, preencha pelo menos um campo (CPF ou Nome).",
      });
      return;
    }

    setLoading(true);
    setResultado(null);

    try {
      // Simula delay da API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Busca ingresso nos dados mockados
      let ingressoEncontrado: Ingresso | undefined;

      if (formData.cpf) {
        ingressoEncontrado = ingressosMock.find(
          (ingresso) => ingresso.cpf === formData.cpf
        );
      } else if (formData.nome) {
        ingressoEncontrado = ingressosMock.find((ingresso) =>
          ingresso.nome.toLowerCase().includes(formData.nome!.toLowerCase())
        );
      }

      if (ingressoEncontrado) {
        setResultado({
          sucesso: true,
          mensagem: `${MESSAGES.INGRESSO_ENCONTRADO} ${ingressoEncontrado.hash}`,
          ingresso: ingressoEncontrado,
          hash: ingressoEncontrado.hash,
        });
      } else {
        setResultado({
          sucesso: false,
          mensagem: MESSAGES.INGRESSO_NAO_ENCONTRADO,
        });
      }
    } catch (error) {
      console.error("Erro ao verificar ingresso:", error);
      setResultado({
        sucesso: false,
        mensagem: MESSAGES.ERRO_SERVIDOR,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verificarIngresso();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>;
      case "usado":
        return <Badge className="bg-yellow-100 text-yellow-800">Usado</Badge>;
      case "cancelado":
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Ticket className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Verificar Ingresso
          </h1>
          <p className="text-muted-foreground">
            Digite seu CPF ou nome para verificar se seu ingresso foi adquirido
            com sucesso.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Consultar Ingresso</CardTitle>
            <CardDescription>
              Preencha pelo menos um dos campos abaixo para verificar seu
              ingresso.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={handleCPFChange}
                    maxLength={14}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Digite seu nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading || (!formData.cpf && !formData.nome)}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Verificando...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Verificar Ingresso
                  </>
                )}
              </Button>
            </form>

            {/* Resultado da Verificação */}
            {resultado && (
              <div className="mt-6">
                <Alert
                  className={
                    resultado.sucesso
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }
                >
                  {resultado.sucesso ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription
                    className={
                      resultado.sucesso ? "text-green-800" : "text-red-800"
                    }
                  >
                    {resultado.mensagem}
                  </AlertDescription>
                </Alert>

                {/* Detalhes do Ingresso */}
                {resultado.sucesso && resultado.ingresso && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Detalhes do Ingresso</span>
                        {getStatusBadge(resultado.ingresso.status)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Nome
                          </Label>
                          <p className="text-sm font-medium">
                            {resultado.ingresso.nome}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            CPF
                          </Label>
                          <p className="text-sm font-medium">
                            {resultado.ingresso.cpf}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Email
                          </Label>
                          <p className="text-sm font-medium">
                            {resultado.ingresso.email}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">
                            Data da Compra
                          </Label>
                          <p className="text-sm font-medium">
                            {formatDate(resultado.ingresso.dataCompra)}
                          </p>
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <Label className="text-sm font-medium text-gray-500">
                          Hash do Ingresso
                        </Label>
                        <p className="text-sm font-mono bg-gray-100 p-2 rounded mt-1 break-all">
                          {resultado.ingresso.hash}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informações Adicionais */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Não encontrou seu ingresso? Entre em contato conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="outline" size="sm">
              Suporte via WhatsApp
            </Button>
            <Button variant="outline" size="sm">
              Enviar Email
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
