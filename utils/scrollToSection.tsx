export const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const elementPosition: any = element?.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        })

    }
}