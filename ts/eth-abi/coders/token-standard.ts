import {Coder, Reader, Writer} from './abstract-coder';
import {arrayify, BytesLike, hexZeroPad} from '@ethersproject/bytes';

export class TokenStandardCoder extends Coder {
    size: number;

    constructor(localName: string) {
        super('tokenStandard', 'tokenStandard', localName, false);
        this.size = 10;
    }

    defaultValue(): string {
        return '0x00000000000000000000';
    }

    encode(writer: Writer, value: BytesLike): number {
        let data = arrayify(value);
        if (data.length !== this.size) {
            this._throwError('incorrect data length', value);
        }
        return writer.writeValue(data);
    }

    decode(reader: Reader): any {
        return hexZeroPad(reader.readValue().toHexString(), this.size);
    }
}
