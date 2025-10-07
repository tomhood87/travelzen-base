import fs from "fs";

const pkgPath = new URL("../package.json", import.meta.url);
const pkg = JSON.parse(fs.readFileSync(pkgPath));

const tenantPkg = process.env.NUXT_PACKAGE_TEST;
if (!tenantPkg) {
    console.log("⚠️  No NUXT_PACKAGE_TEST defined — skipping dynamic package.");
    process.exit(0);
}

const githubUrl = `github:tomhood87/${tenantPkg}`;
pkg.dependencies["@rezkit/tours"] = githubUrl;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log(`✅ Set @rezkit/tours to ${githubUrl}`);
