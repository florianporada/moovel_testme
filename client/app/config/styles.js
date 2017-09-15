const colors = {
  primary: '#00b7bf',
  primary1: '#4d86f7',
  primary2: '#6296f9',
  secondary: '#8F0CE8',
  secondary2: '#00B233',
  secondary3: '#00FF48',
  grey1: '#43484d',
  grey2: '#5e6977',
  grey3: '#86939e',
  grey4: '#bdc6cf',
  grey5: '#e1e8ee',
  dkGreyBg: '#232323',
  greyOutline: '#cbd2d9',
}

const styles = {
  container: {
    flex: 1,
    paddingTop: 22,
  },
  flexZero: {
    flex: 0
  },
  bold: {
    fontWeight: 'bold'
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userList: {
    marginTop: 46,
  },
  navBar: {
    backgroundColor: colors.primary,
  },
  profileCard: {
  },
  badgeText: {
    color: colors.grey5,
  },
  badgeContainer: {
    backgroundColor: colors.primary1,
    position: 'absolute',
    left: 55,
    top: -70
  },
  profileCardGeneric: {
    flex: 0,
    flexDirection: 'row',
    paddingBottom: 15
  },
  profileCardIconWrap: {
    justifyContent: 'space-between',
  },
  profileCardInfo: {
    paddingLeft: 30,
  }
}

export { colors, styles }
