// @ts-nocheck

function parseFieldNode(fieldNode) {
  if (fieldNode.selectionSet) {
    const nestedFieldNodes = fieldNode.selectionSet.selections;
    const nestedArgs = {};

    nestedFieldNodes.forEach((nestedFieldNode) => {
      if (
        nestedFieldNode.kind !== 'Field' ||
        nestedFieldNode.name.value === '__typename'
      ) {
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

function parseGraphQLQuery(info, args?) {
  const parseRes = parseFieldNode(info.fieldNodes[0]);
  const data: any = { ...args, ...parseRes };
  // return { where: {}, orderBy: {}, skip: 0, take: 100, select: args.select };
  return data;
}
export default parseGraphQLQuery;
