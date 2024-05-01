export const removeProtectedRoutes = (routesToExclude: string[], paths: any) => {
    return paths.filter((nav: any) => !routesToExclude.includes(nav.path))
}