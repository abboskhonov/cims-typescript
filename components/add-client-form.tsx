"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdClientData {
  full_name: string;
  platform: string;
  username: string;
  phone_number: string;
  status: "contacted";
  assistant_name: string;
  notes: string;
}

// Layout Option 1: Single Column with Sections
export function AddClientFormSingleColumn() {
  const [formData, setFormData] = useState<AdClientData>({
    full_name: "",
    platform: "",
    username: "",
    phone_number: "",
    status: "contacted",
    assistant_name: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (value: string) => {
    setFormData((prev) => ({ ...prev, platform: value }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Add New Client</CardTitle>
        <p className="text-sm text-gray-600">Fill in the client information below</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="full_name" className="text-sm font-medium">Full Name *</Label>
                <Input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone_number" className="text-sm font-medium">Phone Number *</Label>
                <Input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Platform Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Platform Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="platform" className="text-sm font-medium">Platform *</Label>
                <Select onValueChange={handlePlatformChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="telegram">Telegram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="username" className="text-sm font-medium">Username *</Label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
            <div>
              <Label htmlFor="assistant_name" className="text-sm font-medium">Assistant Name</Label>
              <Input
                name="assistant_name"
                value={formData.assistant_name}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="notes" className="text-sm font-medium">Notes</Label>
              <Textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="mt-1"
                placeholder="Add any additional notes about this client..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" className="px-6">
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} className="px-6">
              Add Client
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Layout Option 2: Three Column Layout
export function AddClientFormThreeColumn() {
  const [formData, setFormData] = useState<AdClientData>({
    full_name: "",
    platform: "",
    username: "",
    phone_number: "",
    status: "contacted",
    assistant_name: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (value: string) => {
    setFormData((prev) => ({ ...prev, platform: value }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Add New Client</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Personal Info */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm uppercase tracking-wide text-gray-500">Personal Info</h4>
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="assistant_name">Assistant Name</Label>
                <Input
                  name="assistant_name"
                  value={formData.assistant_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Column 2: Platform Info */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm uppercase tracking-wide text-gray-500">Platform Info</h4>
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select onValueChange={handlePlatformChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="telegram">Telegram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Column 3: Notes */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm uppercase tracking-wide text-gray-500">Additional Info</h4>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Enter any additional notes..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button type="button" onClick={handleSubmit} className="px-8">
              Add Client
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Layout Option 3: Compact Horizontal Layout
export function AddClientFormCompact() {
  const [formData, setFormData] = useState<AdClientData>({
    full_name: "",
    platform: "",
    username: "",
    phone_number: "",
    status: "contacted",
    assistant_name: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlatformChange = (value: string) => {
    setFormData((prev) => ({ ...prev, platform: value }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle>Add New Client</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="full_name" className="text-xs font-medium uppercase">Full Name</Label>
              <Input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="platform" className="text-xs font-medium uppercase">Platform</Label>
              <Select onValueChange={handlePlatformChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="username" className="text-xs font-medium uppercase">Username</Label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone_number" className="text-xs font-medium uppercase">Phone Number</Label>
              <Input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="assistant_name" className="text-xs font-medium uppercase">Assistant Name</Label>
              <Input
                name="assistant_name"
                value={formData.assistant_name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div>
            <Label htmlFor="notes" className="text-xs font-medium uppercase">Notes</Label>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              placeholder="Additional notes..."
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-gray-500">
              * Required fields
            </div>
            <Button type="button" onClick={handleSubmit}>
              Add Client
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Demo Component to show all layouts
export default function AddClientLayouts() {
  const [activeLayout, setActiveLayout] = useState("single");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-center space-x-4 mb-8">
        <Button 
          onClick={() => setActiveLayout("single")} 
          variant={activeLayout === "single" ? "default" : "outline"}
        >
          Single Column
        </Button>
        <Button 
          onClick={() => setActiveLayout("three")} 
          variant={activeLayout === "three" ? "default" : "outline"}
        >
          Three Column
        </Button>
        <Button 
          onClick={() => setActiveLayout("compact")} 
          variant={activeLayout === "compact" ? "default" : "outline"}
        >
          Compact
        </Button>
      </div>

      {activeLayout === "single" && <AddClientFormSingleColumn />}
      {activeLayout === "three" && <AddClientFormThreeColumn />}
      {activeLayout === "compact" && <AddClientFormCompact />}
    </div>
  );
}