import { Injectable } from '@nestjs/common';
import Groq from 'groq-sdk';

@Injectable()
export class AiService {
  private groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  async improveNote(content: string): Promise<string> {
    const res = await this.groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a writing assistant. Improve the grammar, clarity and structure of the given note. Return only the improved text, nothing else.',
        },
        { role: 'user', content },
      ],
    });
    return res.choices[0].message.content || content;
  }

  async summarizeNote(content: string): Promise<string> {
    const res = await this.groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a summarization assistant. Summarize the given note in 2-3 sentences. Return only the summary, nothing else.',
        },
        { role: 'user', content },
      ],
    });
    return res.choices[0].message.content || content;
  }

  async suggestTitle(content: string): Promise<string> {
    const res = await this.groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: 'You are a title suggestion assistant. Suggest a short, catchy title for the given note. Return only the title, nothing else.',
        },
        { role: 'user', content },
      ],
    });
    return res.choices[0].message.content || 'Untitled';
  }
}