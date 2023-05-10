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

function parseGraphQLQuery(info) {
  const args = parseFieldNode(info.fieldNodes[0]);
  return { where: {}, orderBy: {}, skip: 0, take: 100, select: args.select };
}
export default parseGraphQLQuery;
