import { extractScripts } from '../../src/utils/extractScripts'

describe('extractScripts', () => {
  it('returns inline script bodies and ignores other markup', () => {
    const html =
      '<p>x</p><script type="text/javascript"> window.a = 1 </script><noscript>n</noscript><SCRIPT>b()</SCRIPT><script src="x.js"></script>'
    expect(extractScripts(html)).toEqual(['window.a = 1', 'b()'])
  })

  it('handles empty values', () => {
    expect(extractScripts(null)).toEqual([])
    expect(extractScripts('')).toEqual([])
  })
})
