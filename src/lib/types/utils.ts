import { ThunderBlock } from "./index";
import { JSX, DetailedHTMLProps, HTMLAttributes } from "react";

export namespace ThunderUtils {
  /**
   * Все HTML-аттрибуты
   */
  export type BlockHTMLAttributes = Partial<HTMLAttributes<HTMLElement>>;

  /**
   * Уникальный идентификатор блока
   */
  export type BlockId<T extends readonly ThunderBlock[]> = T[number] extends {
    id: infer ID extends string;
  }
    ? ID
    : never;

  /**
   * Извлекает id из всех переданных пользователем блоков
   */
  export type ExtractBlockIds<T extends readonly ThunderBlock[]> =
    T[number] extends {
      id: infer ID extends string;
    }
      ? ID
      : never;

  /**
   * Генерирует объект значений формы из id переданных блоков
   */
  export type Values<T extends readonly ThunderBlock[]> = {
    [K in ExtractBlockIds<T>]: string;
  };

  /**
   * Помогет TypeScript показать "плоскую" структуру типа
   *
   * @example
   * type A = { a: string } & { b: number };
   * // A будет: { a: string } & { b: number }
   * type B = Expand<A>;
   * // B будет: { a: string; b: number }
   */
  export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

  /**
   * Все возможные теги JSX ("div", "input", и т.д.)
   */
  export type JSXElementTag = keyof JSX.IntrinsicElements;

  /**
   * Получает HTML-элемент из JSX тега, например: "input" => HTMLInputElement
   */
  export type ElementFromJSX<T extends JSXElementTag> =
    JSX.IntrinsicElements[T] extends DetailedHTMLProps<infer _, infer E>
      ? E
      : never;

  /**
   * Финальный тип значений формы собранной из блоков
   *
   * @example
   * // Массив блоков переданных в ThunderForm проп blocks:
   * [{ id: "email", bundleType: "customInput" }, { id: "fullname", bundleType: "customInput" }]
   * // Результирующий объект ключ/значение этой формы:
   * {email: string; fullname: string}
   */
  export type FlattenFields<T> = T extends readonly ThunderBlock[]
    ? ThunderUtils.Expand<ThunderUtils.Values<T>>
    : never;
}
