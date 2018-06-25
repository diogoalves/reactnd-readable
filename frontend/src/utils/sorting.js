const orderByVoteScore = (data = []) =>
  data.sort((a, b) => a.voteScore < b.voteScore);

const orderByTimeStamp = (data = []) =>
  data.sort((a, b) => a.timestamp < b.timestamp);

const filterDeleted = (data = []) => data.filter(e => !e.deleleted);

const filterParentId = (data = []) => data.filter(e => !e.deleleted);

export { orderByVoteScore, orderByTimeStamp, filterDeleted };
