# Color Usage Guide for WorkBagel

This guide explains how to maintain color consistency throughout your app using Yellow (#EAB308) and Gray 900 (#111827).

## 1. Using Tailwind Classes (Recommended for NativeWind)

### Primary Actions & Highlights (Yellow)

```jsx
// Buttons
<TouchableOpacity className="bg-primary px-6 py-3 rounded-lg">
  <Text className="text-secondary font-semibold">Primary Button</Text>
</TouchableOpacity>

// Backgrounds
<View className="bg-primary">
  {/* Content */}
</View>

// Text
<Text className="text-primary font-bold text-xl">Highlighted Text</Text>

// Borders
<View className="border-2 border-primary rounded-lg">
  {/* Content */}
</View>
```

### Secondary Actions & Text (Gray 900)

```jsx
// Buttons
<TouchableOpacity className="bg-secondary px-6 py-3 rounded-lg">
  <Text className="text-white font-semibold">Secondary Button</Text>
</TouchableOpacity>

// Text (primary text color)
<Text className="text-secondary font-semibold">Main Heading</Text>
<Text className="text-text-secondary">Secondary Text</Text>

// Backgrounds
<View className="bg-secondary">
  <Text className="text-white">Dark background content</Text>
</View>
```

## 2. Using StyleSheet with Constants

```jsx
import { Colors } from "@/constants/colors";

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: Colors.primary.DEFAULT,
    padding: 16,
    borderRadius: 8,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary.DEFAULT,
    padding: 16,
    borderRadius: 8,
  },
  heading: {
    color: Colors.text.primary,
    fontSize: 24,
    fontWeight: "bold",
  },
  accent: {
    color: Colors.accent,
  },
});
```

## 3. Common Component Patterns

### Cards

```jsx
<View className="bg-white border border-border rounded-xl p-4 shadow-sm">
  <Text className="text-secondary font-bold text-lg">Card Title</Text>
  <Text className="text-text-secondary mt-2">Card description</Text>
</View>
```

### Buttons

```jsx
// Primary Button
<TouchableOpacity className="bg-primary px-6 py-3 rounded-lg">
  <Text className="text-secondary font-semibold">Get Started</Text>
</TouchableOpacity>

// Secondary Button
<TouchableOpacity className="bg-secondary px-6 py-3 rounded-lg">
  <Text className="text-white font-semibold">Learn More</Text>
</TouchableOpacity>

// Outline Button
<TouchableOpacity className="border-2 border-primary px-6 py-3 rounded-lg">
  <Text className="text-primary font-semibold">Outline</Text>
</TouchableOpacity>
```

### Input Fields

```jsx
<TextInput
  className="border border-border rounded-lg px-4 py-3 text-text-primary bg-white"
  placeholder="Enter text..."
  placeholderTextColor={Colors.text.light}
/>
```

### Icons with Brand Colors

```jsx
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@/constants/colors';

<Ionicons name="star" size={24} color={PRIMARY_COLOR} />
<Ionicons name="menu" size={24} color={SECONDARY_COLOR} />
```

## 4. Color Decision Matrix

| Use Case          | Color         | Class/Value                        |
| ----------------- | ------------- | ---------------------------------- |
| Primary CTAs      | Yellow        | `bg-primary` or `#EAB308`          |
| Headers/Titles    | Gray 900      | `text-secondary` or `#111827`      |
| Body Text         | Gray 900      | `text-text-primary` or `#111827`   |
| Secondary Text    | Gray 500      | `text-text-secondary` or `#6B7280` |
| Highlights/Badges | Yellow        | `bg-primary` or `#EAB308`          |
| Dark Backgrounds  | Gray 900      | `bg-secondary` or `#111827`        |
| Icons (Primary)   | Yellow        | `PRIMARY_COLOR`                    |
| Icons (Secondary) | Gray 900      | `SECONDARY_COLOR`                  |
| Borders           | Gray 200      | `border-border` or `#E5E7EB`       |
| Background        | White/Gray 50 | `bg-white` or `bg-surface`         |

## 5. Best Practices

### ✅ DO:

- Use `bg-primary` for important actions and highlights
- Use `text-secondary` for headings and important text
- Use `text-text-secondary` for supporting text
- Maintain high contrast for accessibility
- Use yellow sparingly for emphasis

### ❌ DON'T:

- Don't use random hex colors
- Don't use blue, purple, or other off-brand colors
- Don't use too much yellow - it should accent, not dominate
- Don't use low-contrast color combinations

## 6. Example Screen Structure

```jsx
import { Colors } from "@/constants/colors";

export default function ExampleScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header */}
      <View className="bg-white border-b border-border px-4 py-3">
        <Text className="text-secondary font-bold text-xl">Screen Title</Text>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4 py-6">
        {/* Card */}
        <View className="bg-white border border-border rounded-xl p-4 mb-4">
          <Text className="text-secondary font-semibold text-lg">
            Card Title
          </Text>
          <Text className="text-text-secondary mt-2">
            Description text here
          </Text>

          {/* Badge */}
          <View className="bg-primary px-3 py-1 rounded-full self-start mt-3">
            <Text className="text-secondary font-semibold text-sm">New</Text>
          </View>
        </View>

        {/* Primary Action */}
        <TouchableOpacity className="bg-primary px-6 py-4 rounded-lg">
          <Text className="text-secondary font-semibold text-center text-lg">
            Primary Action
          </Text>
        </TouchableOpacity>

        {/* Secondary Action */}
        <TouchableOpacity className="bg-secondary px-6 py-4 rounded-lg mt-3">
          <Text className="text-white font-semibold text-center text-lg">
            Secondary Action
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
```

## 7. Quick Reference

```jsx
// Import colors constant
import { Colors, PRIMARY_COLOR, SECONDARY_COLOR } from "@/constants/colors";

// Tailwind Classes
className = "bg-primary"; // Yellow background
className = "bg-secondary"; // Gray 900 background
className = "text-primary"; // Yellow text
className = "text-secondary"; // Gray 900 text
className = "border-primary"; // Yellow border
className = "border-border"; // Gray 200 border

// Direct colors (for icons, etc.)
color = { PRIMARY_COLOR }; // #EAB308
color = { SECONDARY_COLOR }; // #111827
```
