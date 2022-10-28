class pageNotFoundController {
    async showPage(req: any, res: any) {
        res.statusCode = 404;
        res.end(`Page with this ${req.url} was not found`);
    }
}

export default new pageNotFoundController;