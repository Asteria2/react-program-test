setColor = () => {
  const styleEl = document.createElement('style');
  const {
    background
  } = this.state;
  const style = `
  .ant-menu.ant-menu-dark .ant-menu-item-selected{
    background-color:${background};
  }
  .header-nav .header-nav-up{
    border-bottom: 1px solid ${background};
  }
  .ant-btn-link {
    color: ${background};
  }
  .tool {
    background-color:${background};
  }
  .ant-btn:hover{
    color: ${background};
    border-color: ${background};
  }
  html {
    --antd-wave-shadow-color: ${background};}`;
  styleEl.innerHTML = style;
  document.querySelector('head').appendChild(styleEl);
}