export interface PaymentPreferenceRequest {
  title: string;
  description: string;
  quantity: number;
  unit_price: number;
  currency_id: string;
  external_reference: string;
  payer: {
    name: string;
    email: string;
  };
}

export interface PaymentPreferenceResponse {
  id: string;
  init_point: string;
  sandbox_init_point: string;
  client_id: string;
  collector_id: number;
  operation_type: string;
  additional_info: string;
  external_reference: string;
  date_created: string;
  payer: {
    name: string;
    email: string;
  };
}

export async function createPaymentPreference(
  nome: string,
  email: string,
  convidadoId: string
): Promise<PaymentPreferenceResponse> {
  try {
    const external_reference = convidadoId;
    console.log(
      "Gerando preferência de pagamento com external_reference:",
      external_reference
    );

    const payload: PaymentPreferenceRequest = {
      title: "Boreal Fest",
      description: "Uma festa",
      quantity: 1,
      unit_price: 1.05,
      currency_id: "BRL",
      external_reference,
      payer: {
        name: nome,
        email: email,
      },
    };

    console.log("Payload para Mercado Pago:", payload);

    console.log("Fazendo requisição para Mercado Pago...");
    const response = await fetch(
      "https://jvdpz4zf-3000.brs.devtunnels.ms/payment/preference",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    console.log("Status da resposta:", response.status);
    console.log(
      "Headers da resposta:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro na resposta:", errorText);
      throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
    }

    const result: PaymentPreferenceResponse = await response.json();
    console.log("Resposta do Mercado Pago:", result);

    return result;
  } catch (error) {
    console.error("Erro ao criar preferência de pagamento:", error);
    throw error;
  }
}
