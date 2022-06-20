import React from 'react';
import Production from './view/production';

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
          padding: 10,
          display: 'flex',
          overflowY: 'auto',
          overflowX: 'hidden',
          maxWidth: 100 + 'vw',
          flexDirection: 'column',
        }}
      >
        <Production title={this.state.title} />
      </div>
    );
  }
}

export default App;
