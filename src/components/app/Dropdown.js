import React from 'react'
import IconButton from './IconButton'
import defaultStyles from '../../styles'

const styles = {
  dropdownButton: {
    backgroundColor: '#f8f8f8',
    color: '#999',
    padding: '7px 10px',
    fontSize: '16px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: '4px'
  },
  dropdown: {
    position: 'relative',
    display: 'inline-block'
  },
  dropdownContent: {
    right: '10px',
    bottom: '40px',
    position: 'absolute',
    backgroundColor: '#f9f9f9',
    width: 'auto',
    overflow: 'auto',
    boxShadow: '0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07)',
    transitionProperty: 'color,background-color,box-shadow,transform',
    transitionDuration: '.15s',
    zIndex: '1',
    borderRadius: '3px'
  },
  dropdownLink: {
    color: '#666',
    padding: '8px 10px',
    textDecoration: 'none',
    display: 'block',
    cursor: 'pointer'
  }
}


const gradients = [
  { backgroundImage: 'linear-gradient(45deg, #662D8C, #ED1E79)' },
  { backgroundImage: 'linear-gradient(-90deg, #000000 0%, #434343 100%)' },
  { backgroundImage: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)' },
  { backgroundImage: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)' }
]

class Dropdown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false
    }
  }
  

  render() {
    const { show } = this.state;
    const {
      handleGradientClick,
      updatePathname
    } = this.props;
    return(
      <div style={styles.dropdown}>
        <button onClick={() => this.setState({show: !show})} style={styles.dropdownButton}>
          <div style={defaultStyles.IconButton}>  
            <i className={`fa fa-gear`} style={{fontSize: '20px'}}/>  
          </div>
        </button>
          <div id="myDropdown" 
            style={{
              ...styles.dropdownContent,
              display: show ? 'block' : 'none'
            }}>
            <div 
            style={{
              padding: '8px 10px', 
              color: '#555',
              cursor: 'pointer'
          }} onClick={updatePathname}>Credentials</div>
            <div style={{
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              alignItems:'center',
              padding: '8px 10px',
            }}>
           
            {gradients.map((g, i) => 
              <div style={{
                height: '30px',
                width: '30px',
                borderRadius: '50%',
                backgroundImage: g.backgroundImage,
                marginRight: '5px'
              }}
              className="gradient"
              onClick={() => handleGradientClick(g)}
              ></div>
            )}
            </div>
            
          </div>
      </div>
    )
  }
}

export default Dropdown;