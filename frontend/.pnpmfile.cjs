function readPackage(pkg) {
  if (pkg.peerDependencies?.vite) {
    pkg.peerDependencies.vite = '^6.4.3'
  }
  return pkg
}

module.exports = { hooks: { readPackage } }
