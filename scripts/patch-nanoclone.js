const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const source = path.join(projectRoot, 'build-shims', 'nanoclone.js')
const target = path.join(projectRoot, 'node_modules', 'nanoclone', 'index.js')

if (!fs.existsSync(source) || !fs.existsSync(path.dirname(target))) {
    process.exit(0)
}

const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : ''
const next = fs.readFileSync(source, 'utf8')

if (current.trim() !== next.trim()) {
    fs.writeFileSync(target, next)
}
