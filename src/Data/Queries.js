import { gql } from '@apollo/client';

export const QUERY1 = gql`
query Bonds {
  bonds(first: 1000, orderBy: tokenId, orderDirection: asc) {
    id
    tokenId
    size
    principalType
    collateralAssigned
    maturity
    interest
    imageCID
    principal
    withdrawn
    mintingDate
    maturityDate
    redeemDate
    cooldownStartDate
    cooldownEndDate
    buyer
    redeemer
    holder {
      id
    }
  }
}
`;

export const QUERY2 = gql`
query BondsHolders {
  bondHolders(orderBy: totalBonds, orderDirection: desc) {
    id
    totalBonds
    totalActive
    totalRedeemed
    dateJoined
    bonds(orderBy: tokenId, orderDirection: asc) {
      id
      principal
      mintingDate
      size
    }
  }
}
`;

export const QUERY3 = gql`
query BondsFactory {
  factoryBonds(first: 1) {
    id
    totalSupply
    totalActive
    totalRedeemed
    totalPrincipal
    totalCollateralized
    totalCollateralizedLocked
  }
}
`;

export const QUERY4 = gql`
  query EthixHoldersDayCount {
    dayCountEthixHolders(first: 1000, where: { id_gt: 18617 }) {
      id
      date
      count
    }
  }
`;

export const QUERY5 = gql `
  query StakeEthixTotals {
    factoryEthixes(first: 1) {
      id
      totalStaked
      totalStakedGeneral
      totalStakedHonduras
      totalStakedBrasil
      totalStakedMexico
      totalStakedMexico2
      totalStakedEcuador
      totalStakedPeru
    }
  }
`;

export const QUERY6 = gql`
  query StakeEthixHoldersCurrent {
    stakeEthixHolders(
      first: 1000,
      orderBy: totalAmount, orderDirection: desc,
      where: { totalAmount_gte: 0.000000000000000001 }
    ) {
      id
      type
      totalAmount
      dateJoined
      dateLeft
    }
  }
`;

export const QUERY7 = gql`
query EthixHoldersCurrent {
  ethixHolders(
    first: 1000,
    orderBy: totalAmount, orderDirection: desc,
    where: { totalAmount_gte: 0.000000000000000001 }
  ) {
    id
    totalAmount
    dateJoined
  }
}
`

