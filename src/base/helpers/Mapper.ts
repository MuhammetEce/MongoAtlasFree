import { deserialize, plainToClass, serialize } from 'class-transformer';

export function automapper<T, V>(cls: any, plain: V, options?: any): T {
  const opt = Object.assign({ strategy: 'excludeAll' }, options || {});

  return plainToClass(cls, plain, opt);
}

export function autoserialize<T>(object: T, options?: any): string {
  return serialize(object, options);
}

export function autodeserialize(cls: any, object: string): string {
  return deserialize(cls, object);
}

/**
 *
 *
 * @export
 * @param {any[]} map [[parentKeyName, nestedKeyName, parentObjectBindName], ...]
 * @param {any[]} data [[parentData, nestedData], ...]
 */
export function ncontentassigner(map: any[], data: any[], direct = false) {
  const checkKey = (tuple: any[], des: string[], t: number) => {
    if (!tuple[0][t][des[2]]) {
      tuple[0][t][des[2]] = [];
    }
  };

  const binderFactory = () => {
    if (!direct) {
      return (tuple: any[], des: string[], t: number, n: number) => {
        if (tuple[0][t][des[0]] === n[des[1]]) {
          checkKey(tuple, des, t);
          tuple[0][t][des[2]].push(n);
        }
      };
    }

    return (tuple: any[], des: string[], t: number, n: number) => {
      checkKey(tuple, des, t);
      tuple[0][t][des[2]].push(n);
    };
  };

  const binder = binderFactory();

  for (let i = map.length - 1; i >= 0; i -= 1) {
    const tuple = data[i];
    const des = map[i];

    for (let j = 0; j < tuple[1].length; j += 1) {
      const n = tuple[1][j];

      for (let t = 0; t < tuple[0].length; t += 1) {
        binder(tuple, des, t, n);
      }
    }
  }

  return data[0][0];
}
