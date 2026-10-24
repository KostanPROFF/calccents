export interface Env {
  EMAIL: { send(message: unknown): Promise<unknown> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const probe = await env.EMAIL.send({
      to: 'info@constantinecs.com',
      from: 'hello@calccents.com',
      subject: 'Calccents send_email binding probe',
      text: 'If this arrived, the send_email binding works without a token.',
    });
    return Response.json({ ok: true, probe });
  },
};
