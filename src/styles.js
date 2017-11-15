export default {
  input: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '4px',
    fontSize: '16px',
    width: '50%',
    marginRight: '10px',
    outline: 0
  },
  icon: {
    cursor: 'pointer',
    width: '20px',
    height: '20px',
    textAlign: 'center',
    lineHeight: '20px',
    fontSize: '18px',
    color: '#666',
    margin: 'auto'
  },
  refreshIcon: {
    cursor: 'pointer',
    width: '30px',
    height: '30px',
    border: '1px solid #ddd',
    textAlign: 'center',
    lineHeight: '30px',
    fontSize: '18px',
    color: '#666'
  }, 
  submitButton: {
    color: '#fff',
    backgroundColor: '#28a745',
    backgroundImage: 'linear-gradient(-180deg, #34d058 0%, #28a745 90%)',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer'
  }, 
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '20px'
  }, 
  container: {
    fontFamily: 'Open Sans',
    fontSize: '16px',
    //display:'flex',
    //flexDirection: 'column',
    //justifyContent: 'space-between',
    height: '100%',
    display: 'grid', /* 440 */
    gridTemplateRows: '70px auto 70px',
    gridGap: '20px',
    //backgroundColor: '#000',
    //backgroundImage: 'linear-gradient(45deg, #662D8C, #ED1E79)'
    //backgroundImage: 'linear-gradient(-90deg, #000000 0%, #434343 100%)'
    //backgroundImage: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)'
  },
  parameterWrapper: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '3px',
    backgroundColor: '#f9f9f9',
    fontSize: '14px',
    fontWeight: '700',
  },
  parameter: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}