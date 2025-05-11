import { useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowRight, Download, FileImage, Upload } from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import { Alert, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";

const IMAGE_FORMATS = [
    { value: "png", label: "PNG" },
    { value: "jpg", label: "JPG" },
    { value: "webp", label: "WebP" },
    { value: "gif", label: "GIF" },
    { value: "bmp", label: "BMP" },
    { value: "tiff", label: "TIFF" },
    { value: "ico", label: "ICO" },
    { value: "avif", label: "AVIF" },
];

const ImgConverter = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
    const [outputFormat, setOutputFormat] = useState("png");
    const [isDragging, setIsDragging] = useState(false);
    const [isConverting, setIsConverting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
                setConvertedUrl(null); // Reset converted image when new file is selected
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
    };

    const handleConvert = async () => {
        if (!selectedFile) return;

        setIsConverting(true);

        // Simulate conversion process
        // In a real app, you would send the file to a server or use a library
        setTimeout(() => {
            setConvertedUrl(previewUrl);
            setIsConverting(false);
        }, 1500);
    };

    const handleDownload = () => {
        if (convertedUrl) {
            const link = document.createElement("a");
            link.href = convertedUrl;
            link.download = `converted-image.${outputFormat}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
                    <div className="flex max-w-[980px] flex-col items-center justify-center mx-auto gap-2">
                        <h1 className="text-center text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1]">Convert your images to any format</h1>
                        <p className="max-w-[700px] text-center text-lg text-muted-foreground">Free, fast, and easy to use. No registration required.</p>
                    </div>
                    <div className="w-full max-w-4xl mx-auto space-y-6">
                        <Tabs defaultValue="convert" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="convert">Convert Image</TabsTrigger>
                                <TabsTrigger value="about">About</TabsTrigger>
                            </TabsList>

                            <TabsContent value="convert" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Image Converter</CardTitle>
                                        <CardDescription>Upload an image and convert it to your desired format</CardDescription>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="grid gap-6 lg:grid-cols-2">
                                            {/* Upload Section */}
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <Label htmlFor="image-upload" className="text-base font-medium">
                                                        Upload Image
                                                    </Label>
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Badge variant="outline" className="cursor-help">
                                                                    Supported Formats
                                                                </Badge>
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p>JPG, PNG, WebP, GIF, BMP, TIFF, ICO </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>

                                                <div
                                                    onClick={() => fileInputRef.current?.click()}
                                                    onDragOver={handleDragOver}
                                                    onDragLeave={handleDragLeave}
                                                    onDrop={handleDrop}
                                                    className={cn(
                                                        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                                                        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
                                                    )}
                                                >
                                                    <div className="flex flex-col items-center justify-center space-y-4">
                                                        <div className="rounded-full bg-primary/10 p-4">
                                                            <Upload className="h-8 w-8 text-primary" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="font-medium">Drag & drop your image here or click to browse</p>
                                                            <p className="text-sm text-muted-foreground">Supports JPG, PNG, WebP, GIF, BMP, TIFF, ICO</p>
                                                        </div>
                                                    </div>
                                                    <input id="image-upload" ref={fileInputRef} type="file" accept="image/*" onChange={handleInputChange} className="hidden" />
                                                </div>

                                                {previewUrl && (
                                                    <div className="space-y-2">
                                                        <Label className="font-medium">Original Image:</Label>
                                                        <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
                                                            <img src={previewUrl || "/placeholder.svg"} alt="Original image" className="object-contain" />
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            {selectedFile?.name} ({Math.round(selectedFile?.size / 1024)} KB)
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Conversion Section */}
                                            <div className="space-y-4">
                                                <Label htmlFor="output-format" className="text-base font-medium">
                                                    Convert Image
                                                </Label>

                                                <div className="space-y-2">
                                                    <Label htmlFor="output-format">Select Output Format:</Label>
                                                    <Select id="output-format" value={outputFormat} onValueChange={setOutputFormat}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select format" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {IMAGE_FORMATS.map((format) => (
                                                                <SelectItem key={format.value} value={format.value}>
                                                                    {format.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <Button onClick={handleConvert} disabled={!selectedFile || isConverting} className="w-full">
                                                    {isConverting ? (
                                                        <span className="flex items-center gap-2">
                                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                            Converting...
                                                        </span>
                                                    ) : (
                                                        <span className="flex items-center gap-2">
                                                            <ArrowRight className="h-4 w-4" />
                                                            Convert to {outputFormat.toUpperCase()}
                                                        </span>
                                                    )}
                                                </Button>

                                                {convertedUrl ? (
                                                    <div className="space-y-2">
                                                        <Label className="font-medium">Converted Image:</Label>
                                                        <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
                                                            <img src={convertedUrl || "/placeholder.svg"} alt="Converted image" className="object-contain" />
                                                        </div>
                                                        <Button onClick={handleDownload} variant="outline" className="w-full">
                                                            <Download className="mr-2 h-4 w-4" />
                                                            Download {outputFormat.toUpperCase()}
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="flex aspect-square w-full flex-col items-center justify-center rounded-lg border border-dashed bg-muted/50 p-8">
                                                        <FileImage className="h-10 w-10 text-muted-foreground/50" />
                                                        <p className="mt-4 text-center text-sm text-muted-foreground">
                                                            {selectedFile ? "Click convert to see your image here" : "Upload an image to convert"}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex flex-col items-start">
                                        <Separator className="my-4" />
                                        <Alert variant="default" className="bg-muted/50 border-muted">
                                            <AlertDescription>All conversions happen directly in your browser. Your images are never uploaded to our servers.</AlertDescription>
                                        </Alert>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="about" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>About Image Conversion</CardTitle>
                                        <CardDescription>Learn more about our image conversion service</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <h3 className="text-lg font-medium">Supported Formats</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Our image converter supports all major image formats including PNG, JPG, WebP, GIF, BMP, TIFF, and ICO.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium">Privacy & Security</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                The conversion happens directly in your browser, so your images are never uploaded to our servers, ensuring complete privacy and security.
                                            </p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-medium">How It Works</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Our converter uses advanced browser technologies to transform your images from one format to another without compromising quality. The process is fast,
                                                secure, and completely free.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ImgConverter;
