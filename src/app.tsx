import React from 'react';
import { Image } from 'antd'
import Production from './views/production';

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
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 10,
          maxWidth: 100 + 'vw',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        <Production title={this.state.title} />
      </div>
    );
  }
}

export default App;
