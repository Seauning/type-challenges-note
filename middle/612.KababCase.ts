/*
  612 - KebabCase
  
  ### Question
  
  `FooBarBaz` -> `foo-bar-baz`
*/

type UpperCharacters = {
  A : 'a',
  B : 'b',
  C : 'c',
  D : 'd',
  E : 'e',
  F : 'f',
  G : 'g',
  H : 'h',
  I : 'i',
  J : 'j',
  K : 'k',
  L : 'l',
  M : 'm',
  N : 'n',
  O : 'o',
  P : 'p',
  Q : 'q',
  R : 'r',
  S : 's',
  T : 't',
  U : 'u',
  V : 'v',
  W : 'w',
  X : 'x',
  Y : 'y',
  Z : 'z',
}

// 碰到大写字母时转为 -小写字母 的格式
type UpperToAndLower<S> = S extends `${infer First}${infer Rest}`
                            ? First extends keyof UpperCharacters
                              ? `-${UpperCharacters[First]}${UpperToAndLower<Rest>}`
                              : `${First}${UpperToAndLower<Rest>}`
                            : S;

// FooBarBaz 这种情况会被转为 -foo-bar-baz 需要将第一个 - 去除
// - 这种情况只有单个字符，需要额外判断
type KebabCase<S> = UpperToAndLower<S> extends `-${infer Rest}`
                        ? Rest extends ''
                          ? S
                          : Rest
                        : UpperToAndLower<S>;


// 这种方式也是可以的，通过默认参数，表明是否为第一次，如果既是第一次，字母又是大写，则可以不用加 - 
type _KebabCase<S extends string,
               First extends boolean = true> = S extends `${infer F}${infer R}`
                                                  ? F extends keyof UpperCharacters
                                                    ? `${First extends true ? '' : '-'}${UpperCharacters[F]}${_KebabCase<R, false>}`
                                                    : `${F}${_KebabCase<R, false>}`
                                                  : ''


import type { Equal, Expect } from '@type-challenges/utils'

type KebabCase1 = KebabCase<'FooBarBaz'>;
type KebabCase2 = KebabCase<'fooBarBaz'>;
type KebabCase3 = KebabCase<'foo-bar'>;
type KebabCase4 = KebabCase<'foo_bar'>;
type KebabCase5 = KebabCase<'Foo-Bar'>;
type KebabCase6 = KebabCase<'ABC'>;
type KebabCase7 = KebabCase<'-'>;
type KebabCase8 = KebabCase<''>;
type KebabCase9 = KebabCase<'😎'>;

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]