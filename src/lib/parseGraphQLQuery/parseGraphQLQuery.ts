// @ts-nocheck

function parseFieldNode(fieldNode) {
  if (fieldNode.selectionSet) {
    const nestedFieldNodes = fieldNode.selectionSet.selections;
    const nestedArgs = {};

    nestedFieldNodes.forEach((nestedFieldNode) => {
      if (nestedFieldNode.kind !== 'Field') {
        return;
      }
      nestedArgs[nestedFieldNode.name.value] = parseFieldNode(nestedFieldNode);
    });

    return {
      select: nestedArgs,
    };
  } else {
    return true;
  }
}

function parseGraphQLQuery(info, args) {
  const parseRes = parseFieldNode(info.fieldNodes[0]);
  const data: any = {};
  data['select'] = parseRes.select;
  if (typeof args.offset === 'number') {
    data['skip'] = args.offset;
  }
  if (typeof args.limit === 'number') {
    data['take'] = args.limit;
  }
  if (args.where) {
    data['where'] = {};
    for (let key in args.where) {
      if (args.where[key]._eq) {
        data['where'][key] = args.where[key]._eq;
      }
    }
  }
  // return { where: {}, orderBy: {}, skip: 0, take: 100, select: args.select };
  return data;
}
export default parseGraphQLQuery;
