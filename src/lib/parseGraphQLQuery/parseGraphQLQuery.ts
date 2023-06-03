function parseFieldNode(fieldNode: any, fragments: any) {
  if (fieldNode.selectionSet) {
    const nestedFieldNodes = fieldNode.selectionSet.selections;
    let nestedArgs: any = {};
    nestedFieldNodes.forEach((nestedFieldNode: any) => {
      if (nestedFieldNode.kind === 'FragmentSpread') {
        const res = parseFieldNode(
          fragments[nestedFieldNode.name.value],
          fragments
        );
        nestedArgs = { ...nestedArgs, ...res.select };
      } else {
        if (nestedFieldNode.name.value === 'meta') {
          nestedArgs[nestedFieldNode.name.value] = true;
        } else {
          nestedArgs[nestedFieldNode.name.value] = parseFieldNode(
            nestedFieldNode,
            fragments
          );
        }
      }
    });

    return {
      select: nestedArgs,
    };
  } else {
    return true as any;
  }
}

function parseGraphQLQuery(info: any, args?: any) {
  const parseRes = parseFieldNode(info.fieldNodes[0], info.fragments);
  const data: any = { ...args, ...parseRes };
  return data;
}
export default parseGraphQLQuery;
