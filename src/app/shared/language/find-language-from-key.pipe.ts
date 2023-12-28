import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'findLanguageFromKey' })
export class FindLanguageFromKeyPipe implements PipeTransform {
  private languages: { [key: string]: { name: string; rtl?: boolean } } = {
    en: { name: 'English' },
    fr: { name: 'Français' },
    de: { name: 'Deutch' },
    cn: { name: 'China' },
    es: { name: 'Spanich' },
    nl: { name: 'Dutch' },
    ru: { name: 'Russian' },
    pt: { name: 'Portuguese' },
  };

  transform(lang: string): string {
    return this.languages[lang].name;
  }
}
