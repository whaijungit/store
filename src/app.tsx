import React from 'react';
import SwtichPage from './view/switchPage';

class App extends React.Component {
  public state: Readonly<{
    title: LOCA_KEY;
  }>;
  constructor(props) {
    super(props);
    this.state = {
      title: 'production',
    };
  }
  save = (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 1000);
    });
  };

  render() {
    return <SwtichPage></SwtichPage>;
  }
}

export default App;
