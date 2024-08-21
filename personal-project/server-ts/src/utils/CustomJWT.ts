import crypto from 'crypto'

class CustomJWT {
  private key: string
  private alg = { alg: 'HS256', typ: 'JWT'}

  constructor(key: string) {
    this.key = key
  }

  private encodeBase64Url(str: string): string {
    return Buffer.from(str)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  private decodeBase64Url(str: string): string {
    str = str.replace(/-/g, '+').replace(/_/g, '/');

    while (str.length % 4) {
      str += '=';
    }

    return Buffer.from(str, 'base64').toString('utf-8');
  }

  private stringify(obj: Record<string, any>): string {
    return JSON.stringify(obj);
  }

  private checkSumGen(head: string, body: string): string {
    const checkSumStr = head + '.' + body;
    const hash = crypto.createHmac('sha256', this.key);
    const checkSum = hash.update(checkSumStr).digest('base64');

    return this.encodeBase64Url(checkSum);
  }

  encode(obj: Record<string, any>): string {
    const header = this.encodeBase64Url(this.stringify(this.alg));
    const body = this.encodeBase64Url(this.stringify(obj));
    const checkSum = this.checkSumGen(header, body);

    return `${header}.${body}.${checkSum}`;
  }

  decode(token: string): Record<string, any> | false {
    try {
      const [head, body, hash] = token.split('.');

      if (!head || !body || !hash) {
        throw new Error('Invalid token format');
      }

      const checkSum = this.checkSumGen(head, body);

      if (hash === checkSum) {
        return JSON.parse(this.decodeBase64Url(body));
      } else {
        throw new Error('JWT authentication failed');
      }
    } catch (err) {
      throw new Error((err as Error).message);
      return false;
    }
  }

}

export default CustomJWT