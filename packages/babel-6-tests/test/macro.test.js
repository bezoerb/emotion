import * as babel from 'babel-core'

describe('babel macro', () => {
  describe('styled', () => {
    test('tagged template literal member', () => {
      const basic = `
        import styled from './styled/macro'
        const SomeComponent = styled.div\`
          display: flex;
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: ['babel-macros'],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
    test('tagged template literal function', () => {
      const basic = `
        import styled from './styled/macro'
        const SomeComponent = styled('div')\`
          display: flex;
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: ['babel-macros'],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
    test('object member', () => {
      const basic = `
      import styled from './styled/macro'
      const SomeComponent = styled.div({
        display: 'flex'
      })
    `
      const { code } = babel.transform(basic, {
        plugins: ['babel-macros'],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
    test('object function', () => {
      const basic = `
      import styled from './styled/macro'
      const SomeComponent = styled('div')({
        display: 'flex'
      })
    `
      const { code } = babel.transform(basic, {
        plugins: ['babel-macros'],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
    test('some import that does not exist', () => {
      const basic = `
      import { thisDoesNotExist } from './styled/macro'
      const someOtherVar = thisDoesNotExist
      `
      const { code } = babel.transform(basic, {
        plugins: ['babel-macros'],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
    test('css from react', () => {
      const basic = `
      import { css } from './styled/macro'
      const someCls = css\`
        display: flex;
      \`
      `
      const { code } = babel.transform(basic, {
        plugins: ['babel-macros'],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
    test('throws correct error when imported with commonjs', () => {
      const basic = `
      const styled = require('./styled/macro')
      const SomeComponent = styled('div')\`
        display: flex;
      \`
      `
      expect(() =>
        babel.transform(basic, {
          plugins: ['babel-macros'],
          filename: __filename,
          babelrc: false
        })
      ).toThrowError(/the emotion macro must be imported with es modules/)
    })
  })
  test('injectGlobal', () => {
    const basic = `
    import { injectGlobal } from '../../babel-plugin-emotion/src/macro'
    injectGlobal\`
      body {
        margin: 0;
        padding: 0;
        & > div {
          display: none;
          
          &:hover {
            color: green;
            
            & span {
              color: red;
              
              &:after {
                content: "end of line"
              }
            }
          }
        }
      }
      html {
        background: green;
      }
  \`;`
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
  test('fontFace', () => {
    const basic = `
    import { fontFace } from '../../babel-plugin-emotion/src/macro'
    fontFace\`
    font-family: MyHelvetica;
    src: local("Helvetica Neue Bold"),
         local("HelveticaNeue-Bold"),
         url(MgOpenModernaBold.ttf);
    font-weight: bold;
    \`;`
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
  test('css', () => {
    const basic = `
    import { css } from '../../babel-plugin-emotion/src/macro'
    css\`
      margin: 12px 48px;
      color: #ffffff;
      display: flex;
      flex: 1 0 auto;
      color: blue;
      width: \${widthVar};
  \``
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
  test('css object', () => {
    const basic = `
    import { css } from '../../babel-plugin-emotion/src/macro'
    const cls1 = css({ display: 'flex' })
    `
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
  test('hydrate', () => {
    const basic = `
    import { hydrate } from '../../babel-plugin-emotion/src/macro'
    const someOtherVar = hydrate
    `
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
  test('flush', () => {
    const basic = `
    import { flush } from '../../babel-plugin-emotion/src/macro'
    const someOtherVar = flush
    `
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
  test('css call with no args', () => {
    const basic = `
    import { css } from '../../babel-plugin-emotion/src/macro'
    const cls1 = css()
    `
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
  test('css inside of css', () => {
    const basic = `
    import { css } from '../../babel-plugin-emotion/src/macro'
    const cls2 = css\`
      font-size: 20px;
      @media (min-width: 420px) {
        color: blue;
        \${css\`
          width: 96px;
          height: 96px;
        \`};
        line-height: 40px;
      }
      background: green;
    \`
    `
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
  test('some import that does not exist', () => {
    const basic = `
    import { thisDoesNotExist } from '../../babel-plugin-emotion/src/macro'
    const someOtherVar = thisDoesNotExist
    `
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
  test('keyframes', () => {
    const basic = `
    import { keyframes } from '../../babel-plugin-emotion/src/macro'
    const rotate360 = keyframes\`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  \``
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
  test('multiple imports', () => {
    const basic = `
    import { keyframes, css } from '../../babel-plugin-emotion/src/macro'
    const rotate360 = keyframes\`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  \`
  const thing = css\`
  margin: 12px 48px;
  color: #ffffff;
  display: flex;
  flex: 1 0 auto;
  color: blue;
  width: \${widthVar};
\`
  `
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
})
