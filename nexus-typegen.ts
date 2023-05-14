/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  GreWordSearchPromptInputWhereInput: { // input type
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    text?: NexusGenInputs['StringFilter'] | null; // StringFilter
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  GreWordWhereInput: { // input type
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    spelling?: NexusGenInputs['StringFilter'] | null; // StringFilter
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  StringFilter: { // input type
    contains?: string | null; // String
    endsWith?: string | null; // String
    equals?: string | null; // String
    gt?: string | null; // String
    gte?: string | null; // String
    in?: string[] | null; // [String!]
    lt?: string | null; // String
    lte?: string | null; // String
    not?: string | null; // String
    notIn?: string[] | null; // [String!]
    startsWith?: string | null; // String
  }
  UserWhereInput: { // input type
    email?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
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
  Json: any
}

export interface NexusGenObjects {
  GptPrompt: { // root type
    greWordId?: string | null; // String
    id: string; // String!
    input: string; // String!
    response: string; // String!
    user?: NexusGenRootTypes['User'] | null; // User
    userId?: string | null; // String
  }
  GreConfiguration: { // root type
    defaultGreWordSearchPromptInputs: string[]; // [String!]!
  }
  GreWord: { // root type
    id: string; // String!
    spelling: string; // String!
    user?: NexusGenRootTypes['User'] | null; // User
    userId?: string | null; // String
  }
  GreWordSearchPromptInput: { // root type
    id: string; // String!
    text: string; // String!
    userId: string; // String!
  }
  MetaFields: { // root type
    user: NexusGenRootTypes['MetaFields_User']; // MetaFields_User!
  }
  MetaFields_User: { // root type
    showDefaultGreWordSearchPromptInputs: string; // String!
  }
  Mutation: {};
  Post: { // root type
    body?: string | null; // String
    id: string; // String!
    isPublished?: boolean | null; // Boolean
    title?: string | null; // String
  }
  Query: {};
  User: { // root type
    email: string; // String!
    id: string; // String!
    meta?: NexusGenScalars['Json'] | null; // Json
  }
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
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // String
  }
  GreConfiguration: { // field return type
    defaultGreWordSearchPromptInputs: string[]; // [String!]!
  }
  GreWord: { // field return type
    createdAt: string; // String!
    gptPrompts: NexusGenRootTypes['GptPrompt'][]; // [GptPrompt!]!
    id: string; // String!
    spelling: string; // String!
    updatedAt: string; // String!
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // String
  }
  GreWordSearchPromptInput: { // field return type
    createdAt: string; // String!
    id: string; // String!
    text: string; // String!
    updatedAt: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
  }
  MetaFields: { // field return type
    user: NexusGenRootTypes['MetaFields_User']; // MetaFields_User!
  }
  MetaFields_User: { // field return type
    showDefaultGreWordSearchPromptInputs: string; // String!
  }
  Mutation: { // field return type
    createDraft: NexusGenRootTypes['Post'] | null; // Post
    createGreWord: NexusGenRootTypes['GreWord'] | null; // GreWord
    createGreWordSearchPromptInput: NexusGenRootTypes['GreWordSearchPromptInput']; // GreWordSearchPromptInput!
    createUser: NexusGenRootTypes['User'] | null; // User
    deleteGreWordSearchPromptInput: NexusGenRootTypes['GreWordSearchPromptInput'] | null; // GreWordSearchPromptInput
    publish: NexusGenRootTypes['Post'] | null; // Post
    updateGreWordSearchPromptInput: NexusGenRootTypes['GreWordSearchPromptInput'] | null; // GreWordSearchPromptInput
    updateUser: NexusGenRootTypes['User'] | null; // User
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
    greConfiguration: NexusGenRootTypes['GreConfiguration']; // GreConfiguration!
    greWordSearchPromptInputs: NexusGenRootTypes['GreWordSearchPromptInput'][]; // [GreWordSearchPromptInput!]!
    greWords: NexusGenRootTypes['GreWord'][]; // [GreWord!]!
    greWordsCount: number; // Int!
    metaFields: NexusGenRootTypes['MetaFields']; // MetaFields!
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    sendSinglePrompt: string | null; // String
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  User: { // field return type
    createdAt: string; // String!
    email: string; // String!
    gptPrompts: NexusGenRootTypes['GptPrompt'][]; // [GptPrompt!]!
    greWordSearchPromptInputs: NexusGenRootTypes['GreWordSearchPromptInput'][]; // [GreWordSearchPromptInput!]!
    greWords: NexusGenRootTypes['GreWord'][]; // [GreWord!]!
    id: string; // String!
    meta: NexusGenScalars['Json'] | null; // Json
    updatedAt: string; // String!
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
    user: 'User'
    userId: 'String'
  }
  GreConfiguration: { // field return type name
    defaultGreWordSearchPromptInputs: 'String'
  }
  GreWord: { // field return type name
    createdAt: 'String'
    gptPrompts: 'GptPrompt'
    id: 'String'
    spelling: 'String'
    updatedAt: 'String'
    user: 'User'
    userId: 'String'
  }
  GreWordSearchPromptInput: { // field return type name
    createdAt: 'String'
    id: 'String'
    text: 'String'
    updatedAt: 'String'
    user: 'User'
    userId: 'String'
  }
  MetaFields: { // field return type name
    user: 'MetaFields_User'
  }
  MetaFields_User: { // field return type name
    showDefaultGreWordSearchPromptInputs: 'String'
  }
  Mutation: { // field return type name
    createDraft: 'Post'
    createGreWord: 'GreWord'
    createGreWordSearchPromptInput: 'GreWordSearchPromptInput'
    createUser: 'User'
    deleteGreWordSearchPromptInput: 'GreWordSearchPromptInput'
    publish: 'Post'
    updateGreWordSearchPromptInput: 'GreWordSearchPromptInput'
    updateUser: 'User'
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
    greConfiguration: 'GreConfiguration'
    greWordSearchPromptInputs: 'GreWordSearchPromptInput'
    greWords: 'GreWord'
    greWordsCount: 'Int'
    metaFields: 'MetaFields'
    posts: 'Post'
    sendSinglePrompt: 'String'
    users: 'User'
  }
  User: { // field return type name
    createdAt: 'String'
    email: 'String'
    gptPrompts: 'GptPrompt'
    greWordSearchPromptInputs: 'GreWordSearchPromptInput'
    greWords: 'GreWord'
    id: 'String'
    meta: 'Json'
    updatedAt: 'String'
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
      userId: string; // String!
    }
    createGreWordSearchPromptInput: { // args
      text: string; // String!
      userId: string; // String!
    }
    createUser: { // args
      email: string; // String!
      meta?: NexusGenScalars['Json'] | null; // Json
    }
    deleteGreWordSearchPromptInput: { // args
      id: string; // String!
    }
    publish: { // args
      draftId: string; // String!
    }
    updateGreWordSearchPromptInput: { // args
      id: string; // String!
      text: string; // String!
    }
    updateUser: { // args
      email?: string | null; // String
      id?: string | null; // String
      meta?: NexusGenScalars['Json'] | null; // Json
    }
  }
  Query: {
    allPosts: { // args
      isPublished: boolean; // Boolean!
      token?: string | null; // String
    }
    gptPrompts: { // args
      skip?: number | null; // Int
      take?: number | null; // Int
    }
    greWordSearchPromptInputs: { // args
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['GreWordSearchPromptInputWhereInput'] | null; // GreWordSearchPromptInputWhereInput
    }
    greWords: { // args
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['GreWordWhereInput'] | null; // GreWordWhereInput
    }
    greWordsCount: { // args
      where?: NexusGenInputs['GreWordWhereInput'] | null; // GreWordWhereInput
    }
    sendSinglePrompt: { // args
      input: string; // String!
    }
    users: { // args
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
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