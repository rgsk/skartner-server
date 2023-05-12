/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  StringComparisonExp: { // input type
    equals?: string | null; // String
    in?: string[] | null; // [String!]
    not?: string | null; // String
    notIn?: string[] | null; // [String!]
  }
  greWordsBoolExp: { // input type
    id?: NexusGenInputs['uuidComparisonExp'] | null; // uuidComparisonExp
    spelling?: NexusGenInputs['StringComparisonExp'] | null; // StringComparisonExp
  }
  uuidComparisonExp: { // input type
    _eq?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  GptPrompt: { // root type
    greWordId?: string | null; // String
    id: string; // String!
    input: string; // String!
    response: string; // String!
  }
  GreWord: { // root type
    id: string; // String!
    spelling: string; // String!
  }
  Mutation: {};
  Post: { // root type
    body?: string | null; // String
    id: string; // String!
    isPublished?: boolean | null; // Boolean
    title?: string | null; // String
  }
  Query: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  GptPrompt: { // field return type
    createdAt: string; // String!
    greWord: NexusGenRootTypes['GreWord'] | null; // GreWord
    greWordId: string | null; // String
    id: string; // String!
    input: string; // String!
    response: string; // String!
    updatedAt: string; // String!
  }
  GreWord: { // field return type
    createdAt: string; // String!
    gptPrompts: Array<NexusGenRootTypes['GptPrompt'] | null>; // [GptPrompt]!
    id: string; // String!
    spelling: string; // String!
    updatedAt: string; // String!
  }
  Mutation: { // field return type
    createDraft: NexusGenRootTypes['Post'] | null; // Post
    createGreWord: NexusGenRootTypes['GreWord'] | null; // GreWord
    publish: NexusGenRootTypes['Post'] | null; // Post
  }
  Post: { // field return type
    body: string | null; // String
    createdAt: string; // String!
    id: string; // String!
    isPublished: boolean | null; // Boolean
    title: string | null; // String
    updatedAt: string; // String!
  }
  Query: { // field return type
    allPosts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    drafts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    gptPrompts: Array<NexusGenRootTypes['GptPrompt'] | null> | null; // [GptPrompt]
    greWords: Array<NexusGenRootTypes['GreWord'] | null> | null; // [GreWord]
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    sendSinglePrompt: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  GptPrompt: { // field return type name
    createdAt: 'String'
    greWord: 'GreWord'
    greWordId: 'String'
    id: 'String'
    input: 'String'
    response: 'String'
    updatedAt: 'String'
  }
  GreWord: { // field return type name
    createdAt: 'String'
    gptPrompts: 'GptPrompt'
    id: 'String'
    spelling: 'String'
    updatedAt: 'String'
  }
  Mutation: { // field return type name
    createDraft: 'Post'
    createGreWord: 'GreWord'
    publish: 'Post'
  }
  Post: { // field return type name
    body: 'String'
    createdAt: 'String'
    id: 'String'
    isPublished: 'Boolean'
    title: 'String'
    updatedAt: 'String'
  }
  Query: { // field return type name
    allPosts: 'Post'
    drafts: 'Post'
    gptPrompts: 'GptPrompt'
    greWords: 'GreWord'
    posts: 'Post'
    sendSinglePrompt: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createDraft: { // args
      body: string; // String!
      title: string; // String!
    }
    createGreWord: { // args
      promptInput: string; // String!
      promptResponse: string; // String!
      spelling: string; // String!
    }
    publish: { // args
      draftId: string; // String!
    }
  }
  Query: {
    allPosts: { // args
      isPublished: boolean; // Boolean!
      token?: string | null; // String
    }
    gptPrompts: { // args
      limit?: number | null; // Int
      offset?: number | null; // Int
    }
    greWords: { // args
      limit?: number | null; // Int
      offset?: number | null; // Int
      where?: NexusGenInputs['greWordsBoolExp'] | null; // greWordsBoolExp
    }
    sendSinglePrompt: { // args
      input: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}