/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./src/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  EnumGreWordStatusFilter: { // input type
    equals?: NexusGenEnums['GreWordStatus'] | null; // GreWordStatus
    in?: NexusGenEnums['GreWordStatus'][] | null; // [GreWordStatus!]
    not?: NexusGenEnums['GreWordStatus'] | null; // GreWordStatus
    notIn?: NexusGenEnums['GreWordStatus'][] | null; // [GreWordStatus!]
  }
  GreWordOrderByWithRelationInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    spelling?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  GreWordSearchPromptInputWhereInput: { // input type
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    text?: NexusGenInputs['StringFilter'] | null; // StringFilter
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  GreWordTagListRelationFilter: { // input type
    every?: NexusGenInputs['GreWordTagWhereInput'] | null; // GreWordTagWhereInput
    none?: NexusGenInputs['GreWordTagWhereInput'] | null; // GreWordTagWhereInput
    some?: NexusGenInputs['GreWordTagWhereInput'] | null; // GreWordTagWhereInput
  }
  GreWordTagWhereInput: { // input type
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    name?: NexusGenInputs['StringFilter'] | null; // StringFilter
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  GreWordTagWhereUniqueInput: { // input type
    id?: string | null; // String
    name?: string | null; // String
  }
  GreWordWhereInput: { // input type
    greWordTags?: NexusGenInputs['GreWordTagListRelationFilter'] | null; // GreWordTagListRelationFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
    spelling?: NexusGenInputs['StringFilter'] | null; // StringFilter
    status?: NexusGenInputs['EnumGreWordStatusFilter'] | null; // EnumGreWordStatusFilter
    user?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    userId?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
  GreWordWhereUniqueInput: { // input type
    id?: string | null; // String
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
  UserMetaParsedJsonValueInput: { // input type
    defaultGreWordSearchPromptInput?: string | null; // String
    showDefaultGreWordSearchPromptInputs?: boolean | null; // Boolean
  }
  UserOrderByWithRelationInput: { // input type
    createdAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
    email?: NexusGenEnums['SortOrder'] | null; // SortOrder
    id?: NexusGenEnums['SortOrder'] | null; // SortOrder
    updatedAt?: NexusGenEnums['SortOrder'] | null; // SortOrder
  }
  UserWhereInput: { // input type
    email?: NexusGenInputs['StringFilter'] | null; // StringFilter
    id?: NexusGenInputs['StringFilter'] | null; // StringFilter
  }
}

export interface NexusGenEnums {
  GreWordStatus: "ALMOST_LEARNT" | "FINISHED_LEARNING" | "MASTERED" | "MEMORY_MODE" | "STARTED_LEARNING" | "STILL_LEARNING"
  SortOrder: "asc" | "desc"
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
    editedResponse?: string | null; // String
    greWordId?: string | null; // String
    id: string; // String!
    input: string; // String!
    meta: NexusGenScalars['Json']; // Json!
    response: string; // String!
    user?: NexusGenRootTypes['User'] | null; // User
    userId?: string | null; // String
  }
  GreConfiguration: { // root type
    defaultGreWordSearchPromptInputs: string[]; // [String!]!
  }
  GreWord: { // root type
    greWordTags?: NexusGenRootTypes['GreWordTag'][] | null; // [GreWordTag!]
    id: string; // String!
    meta: NexusGenScalars['Json']; // Json!
    spelling: string; // String!
    status: NexusGenEnums['GreWordStatus']; // GreWordStatus!
    user?: NexusGenRootTypes['User'] | null; // User
    userId?: string | null; // String
  }
  GreWordSearchPromptInput: { // root type
    id: string; // String!
    meta: NexusGenScalars['Json']; // Json!
    text: string; // String!
    userId: string; // String!
  }
  GreWordTag: { // root type
    id: string; // String!
    meta: NexusGenScalars['Json']; // Json!
    name: string; // String!
    userId: string; // String!
  }
  Mutation: {};
  Notification: { // root type
    message: string; // String!
    userId: string; // String!
  }
  Post: { // root type
    body?: string | null; // String
    id: string; // String!
    isPublished?: boolean | null; // Boolean
    title?: string | null; // String
  }
  Query: {};
  Subscription: {};
  User: { // root type
    email: string; // String!
    id: string; // String!
  }
  UserMetaParsedJsonValue: { // root type
    defaultGreWordSearchPromptInput?: string | null; // String
    showDefaultGreWordSearchPromptInputs?: boolean | null; // Boolean
  }
  helloWorld: { // root type
    message: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  GptPrompt: { // field return type
    createdAt: string; // String!
    editedResponse: string | null; // String
    greWord: NexusGenRootTypes['GreWord'] | null; // GreWord
    greWordId: string | null; // String
    id: string; // String!
    input: string; // String!
    meta: NexusGenScalars['Json']; // Json!
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
    greWordTags: NexusGenRootTypes['GreWordTag'][] | null; // [GreWordTag!]
    id: string; // String!
    meta: NexusGenScalars['Json']; // Json!
    spelling: string; // String!
    status: NexusGenEnums['GreWordStatus']; // GreWordStatus!
    updatedAt: string; // String!
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // String
  }
  GreWordSearchPromptInput: { // field return type
    createdAt: string; // String!
    id: string; // String!
    meta: NexusGenScalars['Json']; // Json!
    text: string; // String!
    updatedAt: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
  }
  GreWordTag: { // field return type
    createdAt: string; // String!
    greWords: NexusGenRootTypes['GreWord'][]; // [GreWord!]!
    id: string; // String!
    meta: NexusGenScalars['Json']; // Json!
    name: string; // String!
    updatedAt: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
  }
  Mutation: { // field return type
    createDraft: NexusGenRootTypes['Post'] | null; // Post
    createGreWord: NexusGenRootTypes['GreWord']; // GreWord!
    createGreWordSearchPromptInput: NexusGenRootTypes['GreWordSearchPromptInput']; // GreWordSearchPromptInput!
    createGreWordTag: NexusGenRootTypes['GreWordTag']; // GreWordTag!
    createNotification: NexusGenRootTypes['Notification']; // Notification!
    createUser: NexusGenRootTypes['User'] | null; // User
    deleteGptPrompt: NexusGenRootTypes['GptPrompt'] | null; // GptPrompt
    deleteGreWord: NexusGenRootTypes['GreWord'] | null; // GreWord
    deleteGreWordSearchPromptInput: NexusGenRootTypes['GreWordSearchPromptInput'] | null; // GreWordSearchPromptInput
    deleteGreWordTag: NexusGenRootTypes['GreWordTag']; // GreWordTag!
    publish: NexusGenRootTypes['Post'] | null; // Post
    updateGptPrompt: NexusGenRootTypes['GptPrompt'] | null; // GptPrompt
    updateGreWord: NexusGenRootTypes['GreWord'] | null; // GreWord
    updateGreWordSearchPromptInput: NexusGenRootTypes['GreWordSearchPromptInput'] | null; // GreWordSearchPromptInput
    updateUser: NexusGenRootTypes['User'] | null; // User
  }
  Notification: { // field return type
    message: string; // String!
    userId: string; // String!
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
    greWord: NexusGenRootTypes['GreWord'] | null; // GreWord
    greWordSearchPromptInputs: NexusGenRootTypes['GreWordSearchPromptInput'][]; // [GreWordSearchPromptInput!]!
    greWordTags: NexusGenRootTypes['GreWordTag'][]; // [GreWordTag!]!
    greWords: NexusGenRootTypes['GreWord'][]; // [GreWord!]!
    greWordsCount: number; // Int!
    hello: NexusGenRootTypes['helloWorld']; // helloWorld!
    posts: Array<NexusGenRootTypes['Post'] | null> | null; // [Post]
    sendSinglePrompt: string | null; // String
    users: NexusGenRootTypes['User'][]; // [User!]!
    usersCount: number; // Int!
  }
  Subscription: { // field return type
    greWordCreated: NexusGenRootTypes['GreWord'] | null; // GreWord
    notificationReceived: NexusGenRootTypes['Notification'] | null; // Notification
    truths: boolean | null; // Boolean
  }
  User: { // field return type
    createdAt: string; // String!
    email: string; // String!
    gptPrompts: NexusGenRootTypes['GptPrompt'][]; // [GptPrompt!]!
    greWordSearchPromptInputs: NexusGenRootTypes['GreWordSearchPromptInput'][]; // [GreWordSearchPromptInput!]!
    greWordTags: NexusGenRootTypes['GreWordTag'][]; // [GreWordTag!]!
    greWords: NexusGenRootTypes['GreWord'][]; // [GreWord!]!
    id: string; // String!
    meta: NexusGenRootTypes['UserMetaParsedJsonValue']; // UserMetaParsedJsonValue!
    updatedAt: string; // String!
  }
  UserMetaParsedJsonValue: { // field return type
    defaultGreWordSearchPromptInput: string | null; // String
    showDefaultGreWordSearchPromptInputs: boolean | null; // Boolean
  }
  helloWorld: { // field return type
    message: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  GptPrompt: { // field return type name
    createdAt: 'String'
    editedResponse: 'String'
    greWord: 'GreWord'
    greWordId: 'String'
    id: 'String'
    input: 'String'
    meta: 'Json'
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
    greWordTags: 'GreWordTag'
    id: 'String'
    meta: 'Json'
    spelling: 'String'
    status: 'GreWordStatus'
    updatedAt: 'String'
    user: 'User'
    userId: 'String'
  }
  GreWordSearchPromptInput: { // field return type name
    createdAt: 'String'
    id: 'String'
    meta: 'Json'
    text: 'String'
    updatedAt: 'String'
    user: 'User'
    userId: 'String'
  }
  GreWordTag: { // field return type name
    createdAt: 'String'
    greWords: 'GreWord'
    id: 'String'
    meta: 'Json'
    name: 'String'
    updatedAt: 'String'
    user: 'User'
    userId: 'String'
  }
  Mutation: { // field return type name
    createDraft: 'Post'
    createGreWord: 'GreWord'
    createGreWordSearchPromptInput: 'GreWordSearchPromptInput'
    createGreWordTag: 'GreWordTag'
    createNotification: 'Notification'
    createUser: 'User'
    deleteGptPrompt: 'GptPrompt'
    deleteGreWord: 'GreWord'
    deleteGreWordSearchPromptInput: 'GreWordSearchPromptInput'
    deleteGreWordTag: 'GreWordTag'
    publish: 'Post'
    updateGptPrompt: 'GptPrompt'
    updateGreWord: 'GreWord'
    updateGreWordSearchPromptInput: 'GreWordSearchPromptInput'
    updateUser: 'User'
  }
  Notification: { // field return type name
    message: 'String'
    userId: 'String'
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
    greWord: 'GreWord'
    greWordSearchPromptInputs: 'GreWordSearchPromptInput'
    greWordTags: 'GreWordTag'
    greWords: 'GreWord'
    greWordsCount: 'Int'
    hello: 'helloWorld'
    posts: 'Post'
    sendSinglePrompt: 'String'
    users: 'User'
    usersCount: 'Int'
  }
  Subscription: { // field return type name
    greWordCreated: 'GreWord'
    notificationReceived: 'Notification'
    truths: 'Boolean'
  }
  User: { // field return type name
    createdAt: 'String'
    email: 'String'
    gptPrompts: 'GptPrompt'
    greWordSearchPromptInputs: 'GreWordSearchPromptInput'
    greWordTags: 'GreWordTag'
    greWords: 'GreWord'
    id: 'String'
    meta: 'UserMetaParsedJsonValue'
    updatedAt: 'String'
  }
  UserMetaParsedJsonValue: { // field return type name
    defaultGreWordSearchPromptInput: 'String'
    showDefaultGreWordSearchPromptInputs: 'Boolean'
  }
  helloWorld: { // field return type name
    message: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createDraft: { // args
      body: string; // String!
      title: string; // String!
    }
    createGreWord: { // args
      greWordTags?: Array<NexusGenInputs['GreWordTagWhereUniqueInput'] | null> | null; // [GreWordTagWhereUniqueInput]
      promptInput: string; // String!
      promptResponse: string; // String!
      spelling: string; // String!
      userId: string; // String!
    }
    createGreWordSearchPromptInput: { // args
      text: string; // String!
      userId: string; // String!
    }
    createGreWordTag: { // args
      name: string; // String!
      userId: string; // String!
    }
    createNotification: { // args
      message: string; // String!
      userId: string; // String!
    }
    createUser: { // args
      email: string; // String!
      meta?: NexusGenInputs['UserMetaParsedJsonValueInput'] | null; // UserMetaParsedJsonValueInput
    }
    deleteGptPrompt: { // args
      id: string; // String!
    }
    deleteGreWord: { // args
      id: string; // String!
    }
    deleteGreWordSearchPromptInput: { // args
      id: string; // String!
    }
    deleteGreWordTag: { // args
      name: string; // String!
    }
    publish: { // args
      draftId: string; // String!
    }
    updateGptPrompt: { // args
      editedResponse?: string | null; // String
      id: string; // String!
    }
    updateGreWord: { // args
      greWordTags?: Array<NexusGenInputs['GreWordTagWhereUniqueInput'] | null> | null; // [GreWordTagWhereUniqueInput]
      id: string; // String!
      status?: string | null; // String
    }
    updateGreWordSearchPromptInput: { // args
      id: string; // String!
      text: string; // String!
    }
    updateUser: { // args
      email?: string | null; // String
      id?: string | null; // String
      meta?: NexusGenInputs['UserMetaParsedJsonValueInput'] | null; // UserMetaParsedJsonValueInput
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
    greWord: { // args
      where?: NexusGenInputs['GreWordWhereUniqueInput'] | null; // GreWordWhereUniqueInput
    }
    greWordSearchPromptInputs: { // args
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['GreWordSearchPromptInputWhereInput'] | null; // GreWordSearchPromptInputWhereInput
    }
    greWordTags: { // args
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['GreWordTagWhereInput'] | null; // GreWordTagWhereInput
    }
    greWords: { // args
      orderBy?: Array<NexusGenInputs['GreWordOrderByWithRelationInput'] | null> | null; // [GreWordOrderByWithRelationInput]
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
      orderBy?: Array<NexusGenInputs['UserOrderByWithRelationInput'] | null> | null; // [UserOrderByWithRelationInput]
      skip?: number | null; // Int
      take?: number | null; // Int
      where?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    }
    usersCount: { // args
      where?: NexusGenInputs['UserWhereInput'] | null; // UserWhereInput
    }
  }
  Subscription: {
    greWordCreated: { // args
      userId: string; // String!
    }
    notificationReceived: { // args
      userId: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

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