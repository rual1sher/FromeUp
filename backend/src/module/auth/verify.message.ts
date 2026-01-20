export const mailerHtml = (
  name: string,
  code: string,
) => `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; text-align: center; margin: 0; font-size: 28px;">Подтверждение email</h1>
  </div>
  
  <div style="background-color: #f7f7f7; padding: 40px 30px; border-radius: 0 0 10px 10px;">
    <p style="text-align: center; font-size: 18px; color: #333; margin-bottom: 10px;">
      Привет, <strong>${name || 'друг'}</strong>! 👋
    </p>
    
    <p style="text-align: center; color: #666; font-size: 16px; line-height: 1.6; margin: 20px 0;">
      Для подтверждения email в <strong>FromeUp</strong>, пожалуйста, введите следующий код:
    </p>
    
    <div style="background-color: white; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
      <p style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 8px; margin: 0;">
        ${code}
      </p>
    </div>
    
    <p style="text-align: center; color: #999; font-size: 14px; margin-top: 30px;">
      Если вы не запрашивали этот код, просто проигнорируйте это письмо.
    </p>
  </div>
</div>`;
