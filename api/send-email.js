// Vercel Serverless Function - 发送邮件到 info@ans-scm.com
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 检查 API Key 是否配置
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ 
      error: 'RESEND_API_KEY is not configured',
      message: 'Please configure RESEND_API_KEY in Vercel environment variables'
    });
  }

  try {
    const { name, email, phone, company, message, type } = req.body;

    // 验证必填字段
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const subject = type === 'recruit' 
      ? `[採用応募] ${name}様からの応募`
      : `[お問い合わせ] ${name}様からの問い合わせ`;
    
    const emailBody = `
${type === 'recruit' ? '【採用応募】' : '【お問い合わせ】'}

お名前: ${name}
メールアドレス: ${email}
電話番号: ${phone || '未入力'}
会社名: ${company || '未入力'}
${type === 'recruit' ? '応募ポジション' : 'お問い合わせ内容'}: ${message}

---
このメールは ans-scm.com のフォームから送信されました。
`;

    // 使用 Resend 发送邮件
    const { data, error } = await resend.emails.send({
      from: 'ANS Website <onboarding@resend.dev>', // 临时使用，后续需要验证域名后改为 noreply@ans-scm.com
      to: 'info@ans-scm.com',
      replyTo: email,
      subject: subject,
      text: emailBody,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ 
        error: 'Failed to send email',
        message: error.message 
      });
    }

    console.log('Email sent successfully:', data);

    return res.status(200).json({ 
      success: true,
      message: 'Email sent successfully',
      data: data
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      message: error.message 
    });
  }
}
