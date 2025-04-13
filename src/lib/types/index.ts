import { FormikConfig } from "formik";
import { defineThunderBundle } from "../utils/define-thunder-bundle";
import { ReactElement, HTMLProps } from "react";
import { ThunderUtils } from "./utils";

/**
 * Интерфейс, описывающий поведение блока
 */
export interface ThunderBlock extends ThunderUtils.BlockHTMLAttributes {
  /**
   * (!) Уникальный идентификатор, для создания поля внутри формы
   *
   * В будущем, планируется дефолтное поведение для определенного набора строковых литералов
   * Например при передаче в качестве id строки 'email' -> инпут компонента будет валидироваться по предзаполненным правилам, если не будет передано кастомной валидации
   * Тоже самое будет касаться обработки ошибок/загрузок и тд, в приоритете будет кастомное поведение, но по умолчанию будет дефолтное предзаполненное
   */
  readonly id?: string;
  /**
   * Начальное состояние поля
   *
   * // TODO: generic instead of string for number, boolean, null, Date etc?
   */
  readonly initialValue?: string;
  /**
   * Строка, указывающая, какой компонент из бандла определенного через `defineThunderBundle` использовать
   */
  readonly bundleType?: string;
  /**
   * Кастомный плейсхолдер
   *
   * Дефолтный плейсхолдер заполняется сам на основе `id`
   * @example id: 'fullName' -> placeholder: 'Full name'
   * @example id: 'passport' -> placeholder: 'Passport'
   */
  readonly placeholder?: string;
  /**
   * Позволяет обернуть `elements` в контейнер, для этого необходимо определить необходимый компонент через `defineThunderBundle`
   * Затем передать в это поле объект типа ThunderBlock с уникальным `id` и указать `bundleType`
   */
  readonly wrapper?: Pick<ThunderBlock, "id" | "bundleType">;
  /**
   * Nested-ключ `elements`: Позволяет передать несколько элементов с общей оберткой `wrapper`, для того чтобы более гибко стилизовать компоненты при необходимости
   */
  readonly elements?: ThunderBlock[];
  /**
   * Кастомные сообщения для блока при валидации (применяется для конкретного блока и перезатрирает значения из проп `commonMessages`)
   */
  readonly customMessages?: ThunderMessages;
}

/**
 * Типизированный bundle компонентов, ReturnType для функции defineThunderBundle
 */
export type ThunderBundle<T extends Record<string, ReactElement>> = {
  [K in keyof T]: T[K] extends ReactElement<unknown, infer Type>
    ? Type extends ThunderUtils.JSXElementTag
      ? ReactElement<ThunderUtils.ElementFromJSX<Type>>
      : ReactElement
    : never;
};

/**
 * Возможные передаваемые сообщения для валидации
 */
export interface ThunderMessages {
  requiredMessage?: string;
}

/**
 * Набор Props компонента ThunderForm
 */
export interface ThunderFormProps<T extends readonly ThunderBlock[]> {
  /**
   * массив блоков ThunderBlock, формирующих структуру формы
   */
  blocks: T;
  /*
   * Пользовательский набор UI-компонентов, определенный функцией `defineThunderBundle`
   */
  componentsBundle: ReturnType<typeof defineThunderBundle>;
  /*
   * Функция, вызываемая при отправке формы
   */
  onSubmit: FormikConfig<ThunderUtils.FlattenFields<T>>["onSubmit"];
  /*
   * Props, передающиеся на HTML-тег <form>
   */
  formProps?: HTMLProps<HTMLFormElement>;
  /*
   * Общие сообщения для пользователя при валидации (применяется для всех блоков, если в блок не передан проп `customMessages`)
   */
  commonMessages?: ThunderMessages;
}

export { ThunderUtils };
